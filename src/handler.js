const AuthService = require('./authService')

// Instantiate our auth service in the module scope
const authService = new AuthService();

async function handler () {
  try {
    // Get an authentication token so we can call other services
    await authService.GetToken();

    // Return success as long as we don't throw
    return "success";
  } catch (e) {
    return "failure";
  }
};

module.exports = handler;
