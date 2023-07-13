const AuthService = require('../src/authService');
jest.mock("../src/authService")

describe('Create order handler', () => {
    const mockedAuthService = jest.mocked(AuthService);

    test('Returns "success" when all actions succeed', async () => {
        mockedAuthService.mockImplementation(() => {
            return {
                GetToken: () => Promise.resolve("a fake token")
            };
        });
        jest.isolateModules(async () => {
            const handler = require('../src/handler');
            const result = await handler();

            expect(result).toBe("success");
        });
    });

    test('Returns "failure" when any actions fail', async () => {
        mockedAuthService.mockImplementation(() => {
            return {
                GetToken: () => Promise.reject("something went wrong")
            };
        });
        jest.isolateModules(async () => {
            const handler = require('../src/handler');
            const result = await handler();

            expect(result).toBe("failure");
        });
    });
});