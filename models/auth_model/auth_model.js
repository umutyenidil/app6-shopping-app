const AuthMongooseModel = require('./auth_mongoose_model');

class AuthModel {
    async login({emailAddress, password}) {
        return AuthMongooseModel.login({
            emailAddress,
            password
        });
    }

    async register({name, surname, emailAddress, password, passwordAgain}) {
        return AuthMongooseModel.register({
            name,
            surname,
            emailAddress,
            password,
            passwordAgain,
        });
    }

    async logout() {

    }

    async isEmailAddressUnique({emailAddress}) {
        return AuthMongooseModel.isEmailAddressUnique({
            emailAddress,
        });
    }
}

const instance = Object.freeze(new AuthModel());

module.exports = instance;