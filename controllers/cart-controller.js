const Product = require("../models/product");
const User = require("../models/user");
const Cart = require("../models/cart");

// /cart
module.exports.getCart = async (incomingRequest, outgoingResponse, nextMiddleware) => {
    const userId = incomingRequest.user.id;

    try {
        const userCart = await Cart.readCartByUserId({userId});

        outgoingResponse.render('user/cart', {
            title: 'My Cart',
            cartItemList: userCart.items,
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
        await Cart.addProductToCart({userId, productId});

        outgoingResponse.redirect('/cart');
    } catch (error) {
        console.error(error);
    }
};

// /cart/item/quantity/increase
module.exports.postCartItemQuantityIncrease = async (incomingRequest, outgoingResponse, nextMiddleware) => {
    const cart = await Cart.findOne({where:{userUuid:incomingRequest.user.uuid}});

    const cartItem = await CartItem.findOne({where:{uuid: incomingRequest.body.cartItemUuid}});

    const updateData = {
        quantity: cartItem.quantity + 1,
    };
    CartItem.update(updateData, {where:{uuid:cartItem.uuid}})
        .then((result)=>{
            outgoingResponse.redirect('/cart');
        })
        .catch((error)=>{
            console.error(error);
        });
}

// /cart/item/quantity/decrease
module.exports.postCartItemQuantityDecrease = async (incomingRequest, outgoingResponse, nextMiddleware) => {
    const cart = await Cart.findOne({where:{userUuid:incomingRequest.user.uuid}});

    const cartItem = await CartItem.findOne({where:{uuid: incomingRequest.body.cartItemUuid}});

    if(cartItem.quantity > 1){
        const updateData = {
            quantity: cartItem.quantity - 1,
        };
    
        CartItem.update(updateData, {where:{uuid:cartItem.uuid}})
            .then((result)=>{
                outgoingResponse.redirect('/cart');
            })
            .catch((error)=>{
                console.error(error);
            });
    } else {
        CartItem.update({quantity:0, isDeleted:1, deletedAt: sequelize.fn('NOW')}, {where:{uuid:cartItem.uuid}})
        .then((result)=>{
            outgoingResponse.redirect('/cart');
        })
        .catch((error)=>{
            console.error(error);
        });
    }
}

// /cart/item/delete
module.exports.postCartItemDelete = async (incomingRequest, outgoingResponse, nextMiddleware) => {
    const userId = incomingRequest.user.id;
    const cartItemId = incomingRequest.body.cartItemId;

    try {
        await Cart.deleteProductFromCart({userId, cartItemId});

        outgoingResponse.redirect('/cart');
    } catch (error) {
        console.error(error);
    }
}