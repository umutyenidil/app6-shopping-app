const OrderMongooseModel = require("./order_mongoose_model");

class OrderModel {
    async create({userId}) {
        await OrderMongooseModel.create({userId});
    }

    async readAll({userId}) {
        const orders = await OrderMongooseModel.readAll({userId});

        return orders;
    }
}

const instance = Object.freeze(new OrderModel());

module.exports = instance;