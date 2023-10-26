const mongodb = require('mongodb');
const Cart = require("./cart");
const Product = require("./product");
const User = require("./user");
const ObjectId = mongodb.ObjectId;

const getDatabase = require('../utilities/database').getDatabase;


class Order {
    static async createOrderByUserId({userId}) {
        const database = getDatabase();
        const ordersCol = database.collection('orders');

        try {
            const userCart = await User.readUserCart({userId});

            const data = {
                user_id: new ObjectId(userId),
                items: userCart.items,
                is_deleted: 0,
                deleted_at: null,
                created_at: new Date(),
                updated_at: new Date(),
            };

            await ordersCol.insertOne(data);
            await User.emptyUserCart({userId});
        } catch (error) {
            console.error(error);
        }
    }

    static async readOrdersByUserId({userId}) {
        const database = getDatabase();
        const ordersCol = database.collection('orders');

        try {
            const orderList = await ordersCol.find({user_id: new ObjectId(userId), is_deleted: 0}).toArray();

            orderList.map((order) => {
                order.id = order._id.toString();
                delete order._id;

                order.user_id = order.user_id.toString();
            });


            for (const order of orderList) {
                const orderId = order.id;
                order.items = await this.readOrderProductListByOrderId({orderId});
                order.totalPrice = this.calculateTotalOrderPriceByOrderProductList({orderProductList: order.items});
            }

            return orderList;
        } catch (error) {
            console.log(error);
        }
    }

    static async readOrderProductListByOrderId({orderId}) {
        const database = getDatabase();
        const ordersCol = database.collection('orders');

        try {
            const order = await ordersCol.findOne({_id: new ObjectId(orderId), is_deleted: 0});

            order.id = order._id.toString();
            delete order._id;

            order.user_id = order.user_id.toString();

            const orderItemIdList = order.items.map((orderItem) => {
                return orderItem.productId.toString();
            });

            const orderProductList = await Product.readByIds({idList: orderItemIdList});

            return orderProductList.map((product) => {
                const orderItem = order.items.find((item) => {
                    return item.productId === product.id;
                });

                return {
                    quantity: orderItem.quantity,
                    ...product,
                };
            });
        } catch (error) {
            console.log(error);
        }
    }

    static calculateTotalOrderPriceByOrderProductList({orderProductList}) {
        let total = 0;

        for (const product of orderProductList) {
            total += product.quantity * parseInt(product.price);
        }

        return total;
    }
}

module.exports = Order;