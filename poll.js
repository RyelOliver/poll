function poll ({ every = 3000, until }) {
    return new Promise((resolve, reject) => {
        (async function tryUntil () {
            const attempt = await until();

            if (attempt === false)
                reject(false);

            if (attempt === true)
                resolve(true);

            setTimeout(tryUntil, every);
        })();
    });
}

module.exports = poll;