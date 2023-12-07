const UserMongooseModel = require('../user_model/user_mongoose_model');
const {compare} = require("../../utilities/crypt");

class AuthMongooseModel {
    async login({emailAddress, password}) {
        const user = await UserMongooseModel.readByEmailAddress({emailAddress});

        if (!user) {
            return null;
        }

        const isPasswordCorrect = await compare({value: password, hashedValue: user.password});

        if (!isPasswordCorrect) {
            return null;
        }

        return user;
    }

    async register({name, surname, emailAddress, password, passwordAgain}) {
        const username = name.toLowerCase() + surname.toLowerCase();

        const isEmailAddressUnique = await this.isEmailAddressUnique({emailAddress});

        if (!isEmailAddressUnique) {
            return false;
        }

        await UserMongooseModel.create({
            username,
            emailAddress,
            password,
        });

        return true;
    }

    async isEmailAddressUnique({emailAddress}) {
        const user = await UserMongooseModel.readByEmailAddress({
            emailAddress,
        });

        return (user === null);
    }

}

const instance = Object.freeze(new AuthMongooseModel());

module.exports = instance;