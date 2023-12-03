const OrderModel = require('../models/order_model/order_model');

module.exports.getOrders = async (incomingRequest, outgoingResponse, nextMiddleware) => {
    const userId = incomingRequest.user.id;

    try {
        const orderList = await OrderModel.readAll({userId});

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
        await OrderModel.create({userId});

        outgoingResponse.redirect('/orders');
    } catch (error) {
        console.error(error);
    }
};
