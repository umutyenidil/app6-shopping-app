// const mongoose = require('mongoose');
//
// const categorySchema = mongoose.Schema(
//     {
//         creator_id: {
//             ref: 'User',
//             type: mongoose.Schema.Types.ObjectId,
//             alias: 'creatorId',
//         },
//         name: {
//             type: String,
//             required: true,
//         },
//         description: {
//             type: String,
//             required: true,
//         },
//         is_deleted: {
//             type: Boolean,
//             default: false,
//             alias: 'isDeleted',
//         },
//         deleted_at: {
//             type: Date,
//             default: null,
//             alias: 'deletedAt',
//         },
//         updated_at: {
//             type: Date,
//             default: Date.now,
//             alias: 'updatedAt',
//         },
//         created_at: {
//             type: Date,
//             default: Date.now,
//             alias: 'createdAt',
//         }
//     },
//     {
//         // methods for each instance of Product model
//         methods: {
//             test() {
//                 console.log(this);
//             }
//         },
//         // static methods for the Product model
//         statics: {
//             async softDelete(id) {
//                 await Category.updateOne({_id: id}, {is_deleted: 1, deleted_at: new Date()});
//             },
//             async findNotDeletedDocuments() {
//                 return Category.where({is_deleted: false});
//             }
//         },
//         // query helpers for the Product model
//         query: {
//             byName(name) {
//                 return this.where({name: new RegExp(name, 'i')});
//             }
//         }
//     }
// );
//
//
// categorySchema.pre('updateOne', function () {
//     this.set({ updated_at: new Date() });
// });
// // categorySchema.pre('updateOne', {document: true, query: false}, async function (next) {
//
// //     console.log('test');
// //     next();
// //
// // });
//
// const Category = mongoose.model('Category', categorySchema);
//
// module.exports = Category;
//
// // const mongodb = require('mongodb');
// // const ObjectId = mongodb.ObjectId;
// //
// // const { DATE } = require('sequelize');
// // const { v4 : uuidv4 } = require('uuid');
// //
// // const getDatabase = require('../utilities/database').getDatabase;
// //
// //
// // class Category{
// //     static async create({creatorId, name, description}){
// //         const database = getDatabase();
// //
// //         const data = {
// //             creator_id: new ObjectId(creatorId),
// //             name,
// //             description,
// //             is_deleted: 0,
// //             deleted_at: null,
// //             created_at: new Date(),
// //             updated_at: new Date(),
// //         };
// //
// //         try {
// //             const result = await database.collection('categories').insertOne(data);
// //
// //             console.log(result);
// //         } catch (error) {
// //             console.error(error);
// //         }
// //
// //     }
// //
// //     static async readAll(){
// //         const database = getDatabase();
// //
// //         try {
// //             const categoryList = await database.collection('categories').find({is_deleted:0}).toArray();
// //
// //             categoryList.forEach(element => {
// //                 element.id = element._id.toString();
// //                 element.creator_id = element.creator_id.toString();
// //                 delete element._id;
// //             });
// //
// //             return categoryList;
// //         } catch (error) {
// //             console.error(error);
// //         }
// //     }
// //
// //     static async readById(id){
// //         const database = getDatabase();
// //
// //         try {
// //             const product = await database.collection('categories').findOne({_id: new ObjectId(id)});
// //
// //             product.id = product._id.toString();
// //             delete product._id;
// //             product.creator_id = product.creator_id.toString();
// //
// //             return product;
// //         } catch (error) {
// //             console.error(error);
// //         }
// //     }
// //
// //     static async update({id, name, description}){
// //         const database = getDatabase();
// //
// //         try {
// //             const category = await this.readById(id);
// //
// //             const updateData = {
// //                 name: category.name,
// //                 description: category.description,
// //                 updated_at: new Date(),
// //             };
// //
// //             if(name !== category.name){
// //                 updateData.name = name;
// //             }
// //             if(description !== category.description){
// //                 updateData.description = description;
// //             }
// //
// //             await database.collection('categories').updateOne({_id: new ObjectId(id)}, {$set:updateData});
// //         } catch(error){
// //             console.error(error);
// //         }
// //     }
// //
// //     static async deleteById(id){
// //         const database = getDatabase();
// //
// //         const updateData = {
// //             is_deleted : 1,
// //             deleted_at: new Date(),
// //             updated_at: new Date(),
// //         };
// //         try {
// //             await database.collection('categories').updateOne({_id: new ObjectId(id)}, {$set:updateData});
// //         } catch(error){
// //             console.error(error);
// //         }
// //     }
// // }
// //
// // module.exports = Category;