const CartMongooseModel = require('./cart_mongoose_model');

class CartModel {

    async readByUserId({userId}) {
        const userCart = await CartMongooseModel.readByUserId({userId});

        return userCart;
    }

    async addProductToCart({userId, productId}) {
        await CartMongooseModel.addProductToCart({userId, productId});
    }

    async removeItemFromCart({userId, cartItemId}) {
        await CartMongooseModel.removeItemFromCart({userId, cartItemId});
    }

    async increaseCartItemQuantity({userId, cartItemId}) {
        await CartMongooseModel.increaseCartItemQuantity({userId, cartItemId});
    }

    async decreaseCartItemQuantity({userId, cartItemId}) {
        await CartMongooseModel.decreaseCartItemQuantity({userId, cartItemId});
    }
}

const instance = Object.freeze(new CartModel());

module.exports = instance;