const AuthService = require('../src/authService');
jest.mock("../src/authService")

describe('Reset Modules', () => {
    const mockedAuthService = jest.mocked(AuthService);

    test('Returns "success" when all actions succeed', async () => {
        jest.resetModules();
        mockedAuthService.mockImplementation(() => {
            return {
                GetToken: () => Promise.resolve("a fake token")
            };
        });
        const handler = require('../src/handler');
        const result = await handler();

        expect(result).toBe("success");
    });

    test('Returns "failure" when any actions fail', async () => {
        jest.resetModules();
        mockedAuthService.mockImplementation(() => {
            return {
                GetToken: () => Promise.reject("something went wrong")
            };
        });
        const handler = require('../src/handler');
        const result = await handler();

        expect(result).toBe("failure");
    });
});