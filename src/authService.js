class AuthService {
    async GetToken() {
        return Promise.resolve("a real token");
    }
}

module.exports = AuthService;
