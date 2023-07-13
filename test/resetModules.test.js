const AuthService = require('../src/authService');
jest.mock("../src/authService")

describe('Create order handler', () => {
    const mockedAuthService = jest.mocked(AuthService);

    test('Returns 200 when all actions succeed', async () => {
        jest.resetModules();
        mockedAuthService.mockImplementation(() => {
            return {
                GetToken: () => Promise.resolve("a fake token")
            };
        });
        const handler = require('../src/handler');
        const result = await handler();

        expect(result.statusCode).toBe(200);
    });

    test('Returns 500 when any actions fail', async () => {
        jest.resetModules();
        mockedAuthService.mockImplementation(() => {
            return {
                GetToken: () => Promise.reject("something went wrong")
            };
        });
        const handler = require('../src/handler');
        const result = await handler();

        expect(result.statusCode).toBe(500);
    });
});