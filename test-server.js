const assert = require('assert');
const { spawn } = require('child_process');
const io = require('socket.io-client');
const port = 56000 + Math.floor(Math.random() * 1000);
const child = spawn(process.execPath, ['server.js'], { env: { ...process.env, PORT: String(port), ROOM_CAPACITY: '1', ROOM_CLEANUP_DELAY_MS: '400', ROOM_IDLE_MS: '1500' }, stdio: 'inherit' });
const clients = [];
function event(socket, name) {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => reject(new Error(`Timed out waiting for ${name}`)), 3000);
        socket.once(name, (...args) => { clearTimeout(timer); resolve(args); });
    });
}
async function connect() {
    const socket = io(`http://127.0.0.1:${port}`, { reconnection: true });
    clients.push(socket);
    await event(socket, 'connect');
    return socket;
}
async function main() {
    await new Promise(resolve => setTimeout(resolve, 500));
    const a = await connect();
    let malformed = event(a, 'invalidRoom'); a.emit('joinRequest', { toString: null }); await malformed;
    let reply = event(a, 'invalidAction');
    a.emit('playerDeck', '12345', 'leader', [], 'faction');
    await reply;
    const credentials = event(a, 'roomCredentials');
    reply = event(a, 'validRoom'); a.emit('createRequest');
    const [room] = await reply;
    const [, , token] = await credentials;
    reply = event(a, 'invalidAction'); a.emit('playerDeck', room, 'leader', {}, 'faction'); await reply;
    reply = event(a, 'playerAssignment'); a.emit('playerDeck', room, 'leader', ['card'], 'faction');
    assert.strictEqual((await reply)[0], 'A');
    reply = event(a, 'playerAssigned'); a.emit('getPlayerDeck', room, 'A'); await reply;
    reply = event(a, 'invalidAction'); a.emit('getOpponentDeck', room, 'A'); await reply;
    reply = event(a, 'invalidAction'); a.emit('switchTurn', room, [], [null], 1, false); await reply;
    assert.strictEqual(child.exitCode, null, 'server survives malformed events');
    const b = await connect();
    reply = event(b, 'roomsFull'); b.emit('createRequest'); await reply;
    a.close();
    await new Promise(resolve => setTimeout(resolve, 100));
    reply = event(b, 'invalidRoom'); b.emit('joinRequest', room); await reply;
    reply = event(b, 'invalidRoom'); b.emit('rejoinRequest', room, 'wrong'); await reply;
    reply = event(b, 'rejoined'); b.emit('rejoinRequest', room, token);
    assert.strictEqual((await reply)[1], 'A');
    reply = event(b, 'invalidAction'); b.emit('createRequest'); await reply;
    b.close();
    await new Promise(resolve => setTimeout(resolve, 600));
    const c = await connect();
    reply = event(c, 'validRoom'); c.emit('createRequest');
    assert.strictEqual((await reply)[0], room, 'empty room ID is released after grace period');
    const d = await connect();
    const dCredentials = event(d, 'roomCredentials');
    reply = event(d, 'continue'); d.emit('joinRequest', room); await reply;
    const [, , dToken] = await dCredentials;
    reply = event(c, 'playerAssignment'); c.emit('playerDeck', room, 'leader', ['card'], 'faction'); await reply;
    const present = event(c, 'playersConnected');
    reply = event(d, 'playerAssignment'); d.emit('playerDeck', room, 'leader', ['card'], 'faction'); await reply; await present;
    reply = event(c, 'playerDisconnected'); d.close(); await reply;
    reply = event(c, 'invalidAction'); c.emit('passTurn', room); await reply;
    const e = await connect();
    const restored = event(c, 'playersConnected');
    reply = event(e, 'rejoined'); e.emit('rejoinRequest', room, dToken); await reply; await restored;
    reply = event(c, 'passedTurn'); c.emit('passTurn', room); await reply;
    reply = event(c, 'roomExpired'); await reply;
    const f = await connect();
    reply = event(f, 'validRoom'); f.emit('createRequest');
    assert.strictEqual((await reply)[0], room, 'idle connected room expires and its ID is reusable');
    console.log('Socket validation, lifecycle and reconnect tests passed');
}
main().catch(error => { console.error(error); process.exitCode = 1; }).finally(() => {
    clients.forEach(socket => socket.close()); child.kill();
});
