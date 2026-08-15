const test = require('tape');
const got = require('got');
const { spawn } = require('child_process');

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
