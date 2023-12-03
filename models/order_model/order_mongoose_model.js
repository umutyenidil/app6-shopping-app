const OrderMongoose = require('./order_mongoose');
const UserMongoose = require('../user_model/user_mongoose');

class OrderMongooseModel {
    async create({userId}) {
        const user = await UserMongoose.findById(userId).populate('cart.items.product');
        const cartItems = user.cart.items;

        const order = new OrderMongoose({
            user: userId,
            items: cartItems.map((item) => {
                return {
                    product: {...item.product},
                    quantity: item.quantity,
                };
            }),
        });

        await order.save();
        await UserMongoose.updateOne(
            {
                _id: userId,
            },
            {
                'cart.items': [],
            }
        );
    }

    async readAll({userId}) {
        const orders = await OrderMongoose.find(
            {
                user: userId,
            },
        );

        return orders;
    }
}

const instance = Object.freeze(new OrderMongooseModel());

module.exports = instance;