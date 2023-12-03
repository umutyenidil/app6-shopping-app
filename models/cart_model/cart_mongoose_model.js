const UserMongoose = require('../user_model/user_mongoose');
const ProductMongoose = require('../product_model/product_mongoose');

class CartMongooseModel {

    async readByUserId({userId}) {
        const user = await UserMongoose.findById(userId).populate('cart.items.product');

        return user.cart;
    }

    async addProductToCart({userId, productId}) {
        const user = await UserMongoose.findById(userId);
        const userCart = user.cart;

        const productIndexInCartItems = userCart.items.findIndex((cartItem) => {
            return cartItem.product === productId;
        });

        if (productIndexInCartItems === -1) {
            userCart.items.push(
                {
                    product: productId,
                    quantity: 1,
                }
            );
        } else {
            userCart.items[productIndexInCartItems].quantity = userCart.items[productIndexInCartItems].quantity + 1;
        }

        await UserMongoose.findByIdAndUpdate(
            userId,
            {
                cart: userCart,
            }
        );
    }

    async removeItemFromCart({userId, cartItemId}) {
        const user = await UserMongoose.findById(userId);
        const userCart = user.cart;

        const itemIndex = userCart.items.findIndex((cartItem) => {
            return cartItem._id.equals(cartItemId);
        });


        if (itemIndex > -1) {
            userCart.items.splice(itemIndex, 1);
        }

        await UserMongoose.findByIdAndUpdate(
            userId,
            {
                cart: userCart,
            }
        );
    }

    async increaseCartItemQuantity({userId, cartItemId}) {
        const user = await UserMongoose.findById(userId);
        const userCart = user.cart;

        const itemIndex = userCart.items.findIndex((cartItem) => {
            return cartItem._id.equals(cartItemId);
        });

        if (itemIndex > -1) {
            userCart.items[itemIndex].quantity = userCart.items[itemIndex].quantity + 1;
        }

        await UserMongoose.findByIdAndUpdate(
            userId,
            {
                cart: userCart,
            }
        );
    }

    async decreaseCartItemQuantity({userId, cartItemId}) {
        const user = await UserMongoose.findById(userId);
        const userCart = user.cart;

        const itemIndex = userCart.items.findIndex((cartItem) => {
            return cartItem._id.equals(cartItemId);
        });

        if (itemIndex > -1) {
            if (userCart.items[itemIndex].quantity > 1) {
                userCart.items[itemIndex].quantity = userCart.items[itemIndex].quantity - 1;
            } else {
                const userCartItems = userCart.items

                userCartItems.splice(itemIndex, 1);

                userCart.items = userCartItems;
            }
        }

        await UserMongoose.findByIdAndUpdate(
            userId,
            {
                cart: userCart,
            }
        );
    }
}

const instance = Object.freeze(new CartMongooseModel());

module.exports = instance;