const AuthModel = require('../models/auth_model/auth_model');

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

    const user = await AuthModel.login({emailAddress, password});

    if (!user) {
        return outgoingResponse.redirect('/auth/login');
    }

    incomingRequest.session.user = user;
    incomingRequest.session.isAuthenticated = true;
    return incomingRequest.session.save(function (error) {
        console.log(error);
        let url = '/';
        if (incomingRequest.session.redirectTo) {
            url = incomingRequest.session.redirectTo;
            delete incomingRequest.session.redirectTo;
        }

        return outgoingResponse.redirect(url);
    });
};

module.exports.getRegister = async (incomingRequest, outgoingResponse) => {
    registerPageRenderer({
        response: outgoingResponse,
        title: 'Register Page',
    });
};

module.exports.postRegister = async (incomingRequest, outgoingResponse) => {
    const isSignedUp = await AuthModel.register({
        name: incomingRequest.body.name,
        surname: incomingRequest.body.surname,
        emailAddress: incomingRequest.body.email,
        password: incomingRequest.body.password,
        passwordAgain: incomingRequest.body.passwordAgain,
    });

    if (!isSignedUp) {
        return outgoingResponse.redirect('/auth/register');
    }

    return outgoingResponse.redirect('/auth/login');

};

module.exports.postLogout = async (incomingRequest, outgoingResponse) => {
    incomingRequest.session.destroy((error) => {
        console.log(error);
        return outgoingResponse.redirect('/');
    });
}

module.exports.getResetPassword = async (incomingRequest, outgoingResponse) => {
    resetPasswordPageRenderer({
        response: outgoingResponse,
        title: 'Reset Password',
    });
};

module.exports.postResetPassword = async (incomingRequest, outgoingResponse) => {
    return outgoingResponse.redirect('/auth/login');
};