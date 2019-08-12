const poll = require('./poll');

describe('Poll', () => {
    it('Should return a promise', () => {
        const actual = poll({
            every: 100,
            until: () => true,
        });
        expect(actual instanceof Promise).toBeTruthy();
    });

    it('Should resolve when until returns true', async () => {
        const actual = poll({
            every: 100,
            until: () => true,
        });
        await expect(actual).resolves.toBeTruthy();
    });

    it('Should reject when until returns false', async () => {
        const actual = poll({
            every: 100,
            until: () => false,
        });
        await expect(actual).rejects.toBeFalsy();
    });

    it('Should call the until function until it returns true or false', async () => {
        const until = jest.fn()
            .mockReturnValueOnce()
            .mockReturnValueOnce()
            .mockReturnValueOnce(true);
        await poll({
            every: 100,
            until,
        });
        expect(until).toHaveBeenCalledTimes(3);
    });

    it('Should await the until function if it is asynchronous', async () => {
        const until = jest.fn()
            .mockResolvedValueOnce()
            .mockResolvedValueOnce(true);
        await poll({
            every: 100,
            until,
        });
        expect(until).toHaveBeenCalledTimes(2);
    });
});