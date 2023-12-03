const CartModel = require("../models/cart_model/cart_model");

// /cart
module.exports.getCart = async (incomingRequest, outgoingResponse, nextMiddleware) => {
    const userId = incomingRequest.user.id;

    try {
        const cart = await CartModel.readByUserId({userId});

        outgoingResponse.render('user/cart', {
            title: 'My Cart',
            cartItemList: cart.items,
        });
    } catch (error) {
        console.error(error);
    }


};

// /cart/add
module.exports.postCartAdd = async (incomingRequest, outgoingResponse, nextMiddleware) => {
    const userId = incomingRequest.user.id;
    const productId = incomingRequest.body.productId;

    try {
        await CartModel.addProductToCart({userId, productId});

        outgoingResponse.redirect('/cart');
    } catch (error) {
        console.error(error);
    }
};

// /cart/item/quantity/increase
module.exports.postCartItemQuantityIncrease = async (incomingRequest, outgoingResponse, nextMiddleware) => {
    const userId = incomingRequest.user._id;
    const cartItemId = incomingRequest.body.cartItemId;

    try {
        await CartModel.increaseCartItemQuantity({userId, cartItemId});

        outgoingResponse.redirect('/cart');
    } catch (error) {
        console.log(error);
    }
}

// /cart/item/quantity/decrease
module.exports.postCartItemQuantityDecrease = async (incomingRequest, outgoingResponse, nextMiddleware) => {
    const userId = incomingRequest.user._id;
    const cartItemId = incomingRequest.body.cartItemId;

    try {
        await CartModel.decreaseCartItemQuantity({userId, cartItemId});

        outgoingResponse.redirect('/cart');
    } catch (error) {
        console.log(error);
    }
}

// /cart/item/delete
module.exports.postCartItemDelete = async (incomingRequest, outgoingResponse, nextMiddleware) => {
    const userId = incomingRequest.user._id;
    const cartItemId = incomingRequest.body.cartItemId;

    try {
        await CartModel.removeItemFromCart({userId, cartItemId});

        outgoingResponse.redirect('/cart');
    } catch (error) {
        console.log(error);
    }
}