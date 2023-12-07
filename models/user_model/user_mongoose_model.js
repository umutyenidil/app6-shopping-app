const UserMongoose = require('./user_mongoose');

class UserMongooseModel {
    async create({username, emailAddress, password}) {
        const user = new UserMongoose({
            username,
            email_address: emailAddress,
            password, // todo: parolayi kaydetmeden once bcryptjs paketini kullanarak hash'le
        });

        await user.save();
    }


    async read({id}) {
        const user = await UserMongoose.findById(id);

        return user;
    }

    async readByUsername({username}) {
        const user = await UserMongoose.findOne({
            username,
        });

        return user;
    }

    async readByEmailAddress({emailAddress}) {
        const user = await UserMongoose.findOne({
            email_address: emailAddress,
        });

        return user;
    }

    async readAll() {
        const userList = await UserMongoose.find({is_deleted: 0});

        return userList;
    }

    async update({userId, username, emailAddress, password}) {
        await UserMongoose.updateOne(
            {
                _id: userId,
            },
            {
                username,
                emailAddress,
                password
            }
        );
    }

    async delete({id}) {
        await UserMongoose.updateOne(
            {
                _id: id,
            },
            {
                is_deleted: true,
            }
        );
    }
}

const instance = Object.freeze(new UserMongooseModel());

module.exports = instance;