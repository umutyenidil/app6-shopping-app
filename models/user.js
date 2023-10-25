const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectId;

const getDatabase = require('../utilities/database').getDatabase;


class User {
    static async create({emailAddress, password}) {
        const database = getDatabase();

        const data = {
            email_address: emailAddress,
            password: password,
            cart: {
                items: []
            },
            is_deleted: 0,
            deleted_at: null,
            created_at: new Date(),
            updated_at: new Date(),
        };

        try {
            const result = await database.collection('users').insertOne(data);

            console.log(result);
        } catch (error) {
            console.error(error);
        }

    }

    static async readAll() {
        const database = getDatabase();

        try {
            const userList = await database.collection('users').find({is_deleted: 0}).toArray();

            userList.forEach(element => {
                element._id = element._id.toString();
            });

            return userList;
        } catch (error) {
            console.error(error);
        }
    }

    static async readById(id) {
        const database = getDatabase();

        try {
            const user = await database.collection('users').findOne({_id: new ObjectId(id)});

            user._id = user._id.toString();

            return user;
        } catch (error) {
            console.error(error);
        }
    }

    static async readByEmailAddress(emailAddress) {
        const database = getDatabase();

        try {
            const user = await database.collection('users').findOne({email_address: emailAddress});

            if (user) {
                user.id = user._id.toString();
                delete user._id;
            }

            return user;
        } catch (error) {
            console.error(error);
        }
    }

    static async update({id, emailAddress, password}) {
        const database = getDatabase();

        try {
            const user = await this.readById(id);
            const updateData = {
                email_address: user.email_address,
                password: user.password,
                updated_at: new Date(),
            };

            if (emailAddress !== user.email_address) {
                updateData.email_address = emailAddress;
            }
            if (password !== user.password) {
                updateData.password = password;
            }

            await database.collection('users').updateOne({_id: new ObjectId(id)}, {$set: updateData});

        } catch (error) {
            console.error(error);
        }
    }

    static async deleteById(id) {
        const database = getDatabase();

        const updateData = {
            is_deleted: 1,
            deleted_at: new Date(),
            updated_at: new Date(),
        };
        try {
            await database.collection('users').updateOne({_id: new ObjectId(id)}, {$set: updateData});
        } catch (error) {
            console.error(error);
        }
    }

    static async addProductToCart({userId, productId}) {
        const database = getDatabase();
        const usersCol = database.collection('users');

        try {
            const userCart = (await usersCol.findOne({_id: new ObjectId(userId)}, {
                projection: {
                    '_id': false,
                    'cart': true
                }
            })).cart;

            const index = userCart.items.findIndex((cartProduct) => {
                return cartProduct.productId.toString() === productId;
            });

            if (index >= 0) {
                userCart.items[index].quantity = userCart.items[index].quantity + 1;
            } else {
                userCart.items.push({
                    quantity: 1,
                    productId: new ObjectId(productId),
                });
            }

            await usersCol.updateOne(
                {_id: new ObjectId(userId)},
                {
                    $set: {
                        cart: userCart,
                    }
                }
            );
        } catch (error) {
            console.error(error);
        }
    }

    static async deleteProductFromCart({userId, cartItemId}) {
        const database = getDatabase();
        const usersCol = database.collection('users');

        try {
            const userCart = (await usersCol.findOne({_id: new ObjectId(userId)}, {
                projection: {
                    '_id': false,
                    'cart': true
                }
            })).cart;

            const index = userCart.items.findIndex((cartProduct) => {
                return cartProduct.productId.toString() === cartItemId;
            });

            userCart.items.splice(index, 1);

            await usersCol.updateOne(
                {_id: new ObjectId(userId)},
                {
                    $set: {
                        cart: userCart,
                    }
                }
            );
        } catch (error) {
            console.error(error);
        }
    }

    static async readCart({userId}) {
        const database = getDatabase();
        const usersCol = database.collection('users');
        const productsCol = database.collection('products');

        try {
            const userCart = (await usersCol.findOne({_id: new ObjectId(userId)}, {
                projection: {
                    '_id': false,
                    'cart': true
                }
            })).cart;

            const cartProductIdList = userCart.items.map((cartItem) => {
                return cartItem.productId;
            });

            const cartProductList = await productsCol.find({
                _id: {$in: cartProductIdList},
            }).toArray();

            const cartItemList = cartProductList.map((cartProduct) => {
                const cartItem = userCart.items.find((item) => {
                    return item.productId.toString() === cartProduct._id.toString();
                });

                return {
                   quantity: cartItem.quantity,
                    ...cartProduct,
                };
            });

            return cartItemList;
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = User;