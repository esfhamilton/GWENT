const test = require('tape');
const got = require('got');
const { spawn } = require('child_process');
const deckRules = require('./public/js/deckRules');

const port = 5100 + Math.floor(Math.random() * 500);
const baseUrl = `http://127.0.0.1:${port}`;

function waitForServer(child, timeoutMs = 5000) {
    const startedAt = Date.now();

    return new Promise((resolve, reject) => {
        const check = async () => {
            if (child.exitCode !== null) {
                reject(new Error(`server exited with code ${child.exitCode}`));
                return;
            }

            try {
                resolve(await got(`${baseUrl}/index.html`));
            }
            catch (error) {
                if (Date.now() - startedAt >= timeoutMs) reject(error);
                else setTimeout(check, 100);
            }
        };

        check();
    });
}

test('server starts and serves the client', async (t) => {
    const child = spawn(process.execPath, ['server.js'], {
        env: { ...process.env, PORT: String(port) },
        stdio: 'ignore'
    });

    try {
        const response = await waitForServer(child);
        t.equal(response.statusCode, 200, 'index.html responds successfully');
        t.ok(response.body.includes('GWENT'), 'index.html contains the application shell');
    }
    catch (error) {
        t.fail(`server smoke test failed: ${error.message}`);
    }
    finally {
        child.kill();
    }

    t.end();
});

test('All faction exposes every faction card and leader', (t) => {
    const allFactionCards = deckRules.getFactionCardIds('ALL');
    const neutralCards = deckRules.getNeutralCardIds();
    const expectedFactionCardCount = deckRules.factions.reduce((total, faction) => total + faction.cardAmount, 0);

    t.equal(deckRules.getLeaderIds('ALL').length, 16, 'all 16 leaders are available');
    t.equal(allFactionCards.length, expectedFactionCardCount, 'every faction card is available');
    t.equal(new Set(allFactionCards).size, allFactionCards.length, 'faction cards are not duplicated');
    t.deepEqual(deckRules.getDeckFactionIds('ALL'), ['NR', 'NG', 'ST', 'MO'], 'all four card pools are used');
    t.equal(neutralCards.length, 17, 'the neutral pool is included once');
    t.equal(new Set(neutralCards).size, neutralCards.length, 'neutral limits are shared instead of duplicated per faction');
    t.end();
});

test('All faction uses the separately selected perk', (t) => {
    t.equal(deckRules.getGameplayFaction('ALL', 'NG'), 'NG', 'selected All perk is used for gameplay');
    t.equal(deckRules.getGameplayFaction('MO', 'NR'), 'MO', 'standard factions keep their own perk');
    t.end();
});
