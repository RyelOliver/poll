const DEFAULT_EVERY = 3000;
const DEFAULT_TIMEOUT = 3000;

function poll ({ every = DEFAULT_EVERY, until, timeout = DEFAULT_TIMEOUT }) {
    return new Promise((resolve, reject) => {
        (async function tryUntil () {
            try {
                let awaiting = true;
                setTimeout(() => {
                    if (awaiting)
                        reject(Error(
                            `Until could not be resolved within the ${timeout}ms timeout.`
                        ));
                }, timeout);
                const attempt = await until();
                awaiting = false;

                if (attempt === false) {
                    reject(false);
                } else if (attempt === true) {
                    resolve(true);
                } else {
                    setTimeout(tryUntil, every);
                }
            } catch (error) {
                reject(error);
            }
        })();
    });
}

module.exports = poll;