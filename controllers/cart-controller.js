module.exports.getCart = (incomingRequest, outgoingResponse, nextMiddleware) => {
    outgoingResponse.render('user/cart', {
        title: 'My Cart',
        productList: Product.getAllProducts(),
    });
};