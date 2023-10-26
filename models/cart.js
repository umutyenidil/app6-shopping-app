const mongodb = require('mongodb');
const Product = require("./product");
const User = require("./user");
const ObjectId = mongodb.ObjectId;

const getDatabase = require('../utilities/database').getDatabase;


class Cart {
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

    static async readCartByUserId({userId}) {
        const database = getDatabase();
        const usersCol = database.collection('users');
        const productsCol = database.collection('products');

        try {
            let userCart = await User.readUserCart({userId});

            const cartItemIdList = userCart.items.map((cartItem) => {
                return cartItem.productId.toString();
            });

            const cartProductList = await Product.readByIds({idList: cartItemIdList});

            const cartItemList = cartProductList.map((product) => {
                const cartItem = userCart.items.find((item) => {
                    return item.productId === product.id;
                });

                return {
                    quantity: cartItem.quantity,
                    ...product,
                };
            });

            userCart.items = cartItemList;

            return userCart;
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = Cart;