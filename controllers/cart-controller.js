const Product = require("../models/product");
const User = require("../models/user");
const Cart = require("../models/cart");

// /cart
module.exports.getCart = async (incomingRequest, outgoingResponse, nextMiddleware) => {
    const userId = incomingRequest.user.id;

    try {
        const cart = await User.getCartByUserId(userId);

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
        const user = await User.findById(userId);

        await user.addProductToCart(productId);

        outgoingResponse.redirect('/cart');
    } catch (error) {
        console.error(error);
    }
};

// /cart/item/quantity/increase
module.exports.postCartItemQuantityIncrease = async (incomingRequest, outgoingResponse, nextMiddleware) => {
    const userId = incomingRequest.user._id;
    const productId = incomingRequest.body.cartItemId;

    try {
        const user = await User.findById(userId);

        await user.increaseCartItemQuantity(productId);

        outgoingResponse.redirect('/cart');
    } catch (error) {
        console.log(error);
    }
}

// /cart/item/quantity/decrease
module.exports.postCartItemQuantityDecrease = async (incomingRequest, outgoingResponse, nextMiddleware) => {
    const userId = incomingRequest.user._id;
    const productId = incomingRequest.body.cartItemId;

    try {
        const user = await User.findById(userId);

        await user.decreaseCartItemQuantity(productId);

        outgoingResponse.redirect('/cart');
    } catch (error) {
        console.log(error);
    }
}

// /cart/item/delete
module.exports.postCartItemDelete = async (incomingRequest, outgoingResponse, nextMiddleware) => {
    const userId = incomingRequest.user._id;
    const productId = incomingRequest.body.cartItemId;

    try {
        const user = await User.findById(userId);

        await user.deleteProductFromCart(productId);

        outgoingResponse.redirect('/cart');
    } catch (error) {
        console.log(error);
    }
}