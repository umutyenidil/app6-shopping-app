const {navigationLayoutRenderer} = require("../utilities/view-renderers/layout-renderers");
const {
    loginPageRenderer,
    registerPageRenderer,
    resetPasswordPageRenderer
} = require("../utilities/view-renderers/auth-renderer");

module.exports.getLogin = async (incomingRequest, outgoingResponse) => {
    loginPageRenderer({
        response: outgoingResponse,
        title: 'Login Page',
    });
};

module.exports.postLogin = async (incomingRequest, outgoingResponse) => {
    outgoingResponse.redirect('/');
};

module.exports.getRegister = async (incomingRequest, outgoingResponse) => {
    registerPageRenderer({
        response: outgoingResponse,
        title: 'Register Page',
    });
};

module.exports.postRegister = async (incomingRequest, outgoingResponse) => {
    outgoingResponse.redirect('/auth/login');
};

module.exports.getResetPassword = async (incomingRequest, outgoingResponse) => {
    resetPasswordPageRenderer({
        response: outgoingResponse,
        title: 'Reset Password',
    });
};

module.exports.postResetPassword = async (incomingRequest, outgoingResponse) => {
    outgoingResponse.redirect('/auth/login');
};