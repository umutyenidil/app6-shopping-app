const sequelize = require("../utilities/database");

const Cart = require("../models/cart");
const CartItem = require('../models/cart-item');
const Order = require("../models/order");
const OrderItem = require('../models/order-item');

module.exports.getOrders = async (
  incomingRequest,
  outgoingResponse,
  nextMiddleware
) => {
  const cart = await Cart.findOne({
    where: { userUuid: incomingRequest.user.uuid },
  });

  const query = [
    "SELECT ci.uuid, ci.cart_uuid, ci.product_uuid, ci.quantity, p.category_uuid, p.name, p.description, p.price, p.image",
    "FROM cart_items AS ci",
    "INNER JOIN products AS p",
    "ON ci.product_uuid=p.uuid",
    `WHERE ci.cart_uuid="${cart.uuid}" AND ci.is_deleted=0 AND p.is_deleted=0`,
  ].join(" ");
  const [cartItemList, metadata] = await sequelize.query(query);
  console.log(cartItemList);
};

module.exports.postOrdersCreate = async (
  incomingRequest,
  outgoingResponse,
  nextMiddleware
) => {
  // read cart items
  const cart = await Cart.findOne({
    where: { userUuid: incomingRequest.user.uuid },
  });
  const query = [
    "SELECT ci.uuid, ci.cart_uuid, ci.product_uuid, ci.quantity, p.category_uuid, p.name, p.description, p.price, p.image",
    "FROM cart_items AS ci",
    "INNER JOIN products AS p",
    "ON ci.product_uuid=p.uuid",
    `WHERE ci.cart_uuid="${cart.uuid}" AND ci.is_deleted=0 AND p.is_deleted=0`,
  ].join(" ");
  const [cartItemList, metadata] = await sequelize.query(query);

    // start new transaction
    const transaction = await sequelize.transaction();
    try {
        // create new order
        const order = await Order.create({ userUuid: incomingRequest.user.uuid });

        for (const cartItem of cartItemList) {
            await OrderItem.create(
                {
                    orderUuid: order.uuid,
                    productUuid: cartItem.product_uuid,
                    quantity: cartItem.quantity,
                    price: cartItem.price,
                },
                { 
                    transaction: transaction 
                }
            );
            await CartItem.update(
                {
                    isDeleted: 1,
                    deletedAt: sequelize.fn('NOW'),
                }, 
                {
                    where:{
                        uuid:cartItem.uuid
                    },
                    transaction: transaction,
                }
            );
        }

        await transaction.commit();

        outgoingResponse.redirect('/orders');
    }
    catch (error) {
        await transaction.rollback();
    }

  // Örnek bir transaction oluşturma
//   sequelize.transaction(async (transaction) => {
//     try {
//       // For döngüsü ile CartItem oluşturma işlemleri
//       cartItemList.forEach(async (cartItem) => {
//         await OrderItem.create(
//             {
//                 orderUuid: order.uuid,
//                 productUuid: cartItem.product_uuid,
//                 quantity: cartItem.quantity,
//                 price: cartItem.price,
//             },
//             { transaction: transaction }
//           ); // Transaction'u belirt



//       });

//       // Tüm işlemler başarılı olduysa, transaction'ı commit et
//       await transaction.commit();

//       outgoingResponse.redirect('/orders');
//     } catch (error) {
//       // Hata durumunda, transaction'ı geri al
//       await transaction.rollback();
//       console.error("Transaction hata:", error);
//     }
//   });
};
