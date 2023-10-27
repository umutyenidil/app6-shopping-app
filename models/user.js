const mongoose = require('mongoose');
const Product = require("./product");

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        email_address: {
            type: String,
            required: true,
            alias: 'emailAddress',
        },
        password: {
            type: String,
            required: true,
        },
        cart: {
            items: {
                alias: 'itemList',
                type: [
                    {
                        product_id: {
                            ref: 'Product',
                            type: mongoose.Schema.Types.ObjectId,
                            required: true,
                            alias: 'productId',
                        },
                        quantity: {
                            type: Number,
                            required: true,
                        }
                    }
                ],
            }
        },
        is_deleted: {
            type: Boolean,
            default: false,
            alias: 'isDeleted',
        },
        deleted_at: {
            type: Date,
            default: null,
            alias: 'deletedAt',
        },
        updated_at: {
            type: Date,
            alias: 'updatedAt',
        },
        created_at: {
            type: Date,
            default: Date.now,
            alias: 'createdAt',
        }
    },
    {
        // methods for each instance of Product model
        methods: {
            addProductToCart(productId) {
                const index = this.cart.items.findIndex((cartItem) => {
                    return cartItem.product_id.toString() === productId.toString();
                });

                if (index === -1) {
                    this.cart.items.push({quantity: 1, product_id: productId});
                } else {
                    this.cart.items[index].quantity = this.cart.items[index].quantity + 1;
                }

                return this.save();
            },
        },
        // static methods for the Product model
        statics: {
            async getCartByUserId(userId) {
                const user = await User.findById(userId);

                const userCart = user.cart;

                const productIdList = userCart.items.map((cartItem) => {
                    return cartItem.product_id;
                });

                const productList = await Product.find({_id: {$in: [...productIdList]}});

                const cartItemList = productList.map((product) => {
                    const cartItem = userCart.items.find((item) => {
                        return item.product_id.toString() === product._id.toString();
                    });

                    const temp = {...product._doc};
                    temp.quantity = cartItem.quantity;

                    return temp;
                });

                return {items: cartItemList};
            }
        },
        // query helpers for the Product model
        query: {
            byName(name) {
                return this.where({name: new RegExp(name, 'i')});
            }
        }
    }
);

const User = mongoose.model('User', userSchema);

module.exports = User;

// const mongodb = require('mongodb');
// const ObjectId = mongodb.ObjectId;
//
// const getDatabase = require('../utilities/database').getDatabase;
//
//
// class User {
//     static async create({emailAddress, password}) {
//         const database = getDatabase();
//
//         const data = {
//             email_address: emailAddress,
//             password: password,
//             cart: {
//                 items: []
//             },
//             is_deleted: 0,
//             deleted_at: null,
//             created_at: new Date(),
//             updated_at: new Date(),
//         };
//
//         try {
//             const result = await database.collection('users').insertOne(data);
//
//             console.log(result);
//         } catch (error) {
//             console.error(error);
//         }
//
//     }
//
//     static async readAll() {
//         const database = getDatabase();
//
//         try {
//             const userList = await database.collection('users').find({is_deleted: 0}).toArray();
//
//             userList.forEach(element => {
//                 element._id = element._id.toString();
//             });
//
//             return userList;
//         } catch (error) {
//             console.error(error);
//         }
//     }
//
//     static async readById(id) {
//         const database = getDatabase();
//
//         try {
//             const user = await database.collection('users').findOne({_id: new ObjectId(id)});
//
//             user._id = user._id.toString();
//
//             return user;
//         } catch (error) {
//             console.error(error);
//         }
//     }
//
//     static async readByEmailAddress(emailAddress) {
//         const database = getDatabase();
//
//         try {
//             const user = await database.collection('users').findOne({email_address: emailAddress});
//
//             if (user) {
//                 user.id = user._id.toString();
//                 delete user._id;
//             }
//
//             return user;
//         } catch (error) {
//             console.error(error);
//         }
//     }
//
//     static async update({id, emailAddress, password}) {
//         const database = getDatabase();
//
//         try {
//             const user = await this.readById(id);
//             const updateData = {
//                 email_address: user.email_address,
//                 password: user.password,
//                 updated_at: new Date(),
//             };
//
//             if (emailAddress !== user.email_address) {
//                 updateData.email_address = emailAddress;
//             }
//             if (password !== user.password) {
//                 updateData.password = password;
//             }
//
//             await database.collection('users').updateOne({_id: new ObjectId(id)}, {$set: updateData});
//
//         } catch (error) {
//             console.error(error);
//         }
//     }
//
//     static async deleteById(id) {
//         const database = getDatabase();
//
//         const updateData = {
//             is_deleted: 1,
//             deleted_at: new Date(),
//             updated_at: new Date(),
//         };
//         try {
//             await database.collection('users').updateOne({_id: new ObjectId(id)}, {$set: updateData});
//         } catch (error) {
//             console.error(error);
//         }
//     }
//
//     static async readUserCart({userId}){
//         const database = getDatabase();
//         const usersCol = database.collection('users');
//
//         try {
//             const userData = await usersCol.findOne(
//                 {
//                     _id: new ObjectId(userId)
//                 },
//                 {
//                     projection: {
//                         '_id': false,
//                         'cart': true
//                     }
//                 }
//             );
//
//             const userCart = userData.cart;
//
//             userCart.items.map((item) => {
//                item.productId = item.productId.toString();
//             });
//
//             return userCart;
//         } catch (error) {
//             console.error(error);
//         }
//
//     }
//
//     static async emptyUserCart({userId}){
//         const database = getDatabase();
//         const usersCol = database.collection('users');
//
//         try {
//             const updateData = {
//                 "cart.items": [],
//             };
//
//             await usersCol.updateOne({_id: new ObjectId(userId)}, {$set: updateData});
//
//         } catch (error) {
//             console.error(error);
//         }
//     }
// }
//
// module.exports = User;