module.exports.getOrders = async (incomingRequest, outgoingResponse, nextMiddleware) => {
    const userId = incomingRequest.user.id;

    try {
        const orderList = await Order.readOrdersByUserId({userId});

        outgoingResponse.render('user/orders', {
            title: 'Orders',
            orderList,
        });
    } catch (error) {
        console.error(error);
    }


};

module.exports.postOrdersCreate = async (incomingRequest, outgoingResponse, nextMiddleware) => {
    const userId = incomingRequest.user.id;

    try {
        await Order.createOrderByUserId({userId});

        outgoingResponse.redirect('/orders');
    } catch (error) {
        console.error(error);
    }
};
