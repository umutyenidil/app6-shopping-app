const UserMongooseModel = require('./user_mongoose_model');

class UserModel {
    async create({username, emailAddress, password}) {
        await UserMongooseModel.create({
            username,
            emailAddress,
            password,
        });
    }

    async read({id}) {
        const user = UserMongooseModel.read({id});

        return user;
    }

    async readByUsername({username}) {
        const user = await UserMongooseModel.readByUsername({
            username,
        });

        return user;
    }

    async readByEmailAddress({emailAddress}) {
        const user = await UserMongooseModel.readByUsername({
            emailAddress,
        });

        return user;
    }

    async readAll() {
        const userList = await UserMongooseModel.readAll();

        return userList;
    }

    async update({userId, username, emailAddress, password}) {
        await UserMongooseModel.update({
            userId,
            username,
            emailAddress,
            password,
        });
    }

    async delete({id}) {
        await UserMongooseModel.delete({
            id,
        });
    }
}

const instance = Object.freeze(new UserModel());

module.exports = instance;