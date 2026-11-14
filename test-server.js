const assert = require('assert');
const { spawn } = require('child_process');
const io = require('socket.io-client');
const port = 56000 + Math.floor(Math.random() * 1000);
const child = spawn(process.execPath, ['server.js'], { env: { ...process.env, PORT: String(port) }, stdio: 'inherit' });
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
    let reply = event(a, 'invalidAction');
    a.emit('playerDeck', '12345', 'leader', [], 'faction');
    await reply;
    reply = event(a, 'validRoom'); a.emit('createRequest');
    const [room] = await reply;
    reply = event(a, 'invalidAction'); a.emit('playerDeck', room, 'leader', {}, 'faction'); await reply;
    reply = event(a, 'playerAssignment'); a.emit('playerDeck', room, 'leader', ['card'], 'faction');
    assert.strictEqual((await reply)[0], 'A');
    reply = event(a, 'playerAssigned'); a.emit('getPlayerDeck', room, 'A'); await reply;
    reply = event(a, 'invalidAction'); a.emit('getOpponentDeck', room, 'A'); await reply;
    reply = event(a, 'invalidAction'); a.emit('switchTurn', room, [], [null], 1, false); await reply;
    assert.strictEqual(child.exitCode, null, 'server survives malformed events');
    console.log('Socket validation tests passed');
}
main().catch(error => { console.error(error); process.exitCode = 1; }).finally(() => {
    clients.forEach(socket => socket.close()); child.kill();
});
