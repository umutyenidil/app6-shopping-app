const UserModel = require('../models/user_model/user_model');

const {navigationLayoutRenderer} = require("../utilities/view-renderers/layout-renderers");
const {
    loginPageRenderer,
    registerPageRenderer,
    resetPasswordPageRenderer
} = require("../utilities/view-renderers/auth-view-renderer");

module.exports.getLogin = async (incomingRequest, outgoingResponse) => {
    loginPageRenderer({
        response: outgoingResponse,
        title: 'Login Page',
    });
};

module.exports.postLogin = async (incomingRequest, outgoingResponse) => {
    const emailAddress = incomingRequest.body.email;
    const password = incomingRequest.body.password;

    if (emailAddress === 'test@test.com' && password === 'testtest') {
        incomingRequest.session.isAuthenticated = true;
        return outgoingResponse.redirect('/');
    }

    return outgoingResponse.redirect('/auth/login');
};

module.exports.getRegister = async (incomingRequest, outgoingResponse) => {
    registerPageRenderer({
        response: outgoingResponse,
        title: 'Register Page',
    });
};

module.exports.postRegister = async (incomingRequest, outgoingResponse) => {
    const username = incomingRequest.body.name.toLowerCase() + incomingRequest.body.surname.toLowerCase();
    const emailAddress = incomingRequest.body.email;
    const password = incomingRequest.body.password;

    const isEmailAddressUnique = await UserModel.isEmailAddressUnique({emailAddress});


    if (!isEmailAddressUnique) {
        return outgoingResponse.redirect('/auth/register');
    }

    await UserModel.create({
        username,
        emailAddress,
        password,
    });

    return outgoingResponse.redirect('/auth/login');

};

module.exports.getResetPassword = async (incomingRequest, outgoingResponse) => {
    resetPasswordPageRenderer({
        response: outgoingResponse,
        title: 'Reset Password',
    });
};

module.exports.postResetPassword = async (incomingRequest, outgoingResponse) => {
    return outgoingResponse.redirect('/auth/login');
};