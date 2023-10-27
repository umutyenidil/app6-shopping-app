const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
    {
        creator_id: {
            ref: 'User',
            type: mongoose.Schema.Types.ObjectId,
            alias: 'creatorId',
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            cast: 'Fiyat bilgisi sayi olmalidir.',
            required: true,
        },
        categories: [{
            ref: 'Category',
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        }],
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
            default: Date.now,
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
            test() {
                console.log('instance method');
            }
        },
        // static methods for the Product model
        statics: {
            async softDelete(id) {
                await Product.updateOne({_id: id}, {is_deleted: 1, deleted_at: new Date()});
            },
            findNotDeletedDocuments() {
                return Product.where({is_deleted: false});
            },
            findByCategoryId(categoryId) {
                return Product.find({categories: {$in: [categoryId]}, is_deleted: false});
            },
            findByIdWithCategories(productId) {
                return Product.findById(productId).populate('categories')
            }
        },
        // query helpers for the Product model
        query: {
            byName(name) {
                return this.where({name: new RegExp(name, 'i')});
            },

        }
    }
);

productSchema.pre('updateOne', function () {
    this.set({updated_at: new Date()});
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

// const mongodb = require('mongodb');
// const ObjectId = mongodb.ObjectId;
//
// const {DATE} = require('sequelize');
// const {v4: uuidv4} = require('uuid');
//
// const getDatabase = require('../utilities/database').getDatabase;
//
//
// class Product {
//     static async create({creatorId, name, description, price, image, categoryIds}) {
//         const database = getDatabase();
//
//         const data = {
//             creator_id: new ObjectId(creatorId),
//             name,
//             description,
//             price,
//             image,
//             categoryIds: (categoryIds && !Array.isArray(categoryIds) ? Array.of(categoryIds) : categoryIds),
//             is_deleted: 0,
//             deleted_at: null,
//             created_at: new Date(),
//             updated_at: new Date(),
//         };
//
//         try {
//             const result = await database.collection('products').insertOne(data);
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
//             const productList = await database.collection('products').find({is_deleted: 0}).toArray();
//
//             if (productList.length > 0) {
//                 productList.forEach(element => {
//                     element.id = element._id.toString();
//                     delete element._id;
//
//                     element.creator_id = element.creator_id.toString();
//                 });
//             }
//
//             return productList;
//         } catch (error) {
//             console.error(error);
//         }
//     }
//
//     static async readAllByCategoryId(categoryId) {
//         const database = getDatabase();
//
//         try {
//             const productList = await database.collection('products').find({
//                 categoryIds: {$all: [categoryId]},
//                 is_deleted: 0,
//             }).toArray();
//
//             if (productList.length > 0) {
//                 productList.forEach(element => {
//                     element.id = element._id.toString();
//                     delete element._id;
//
//                     element.creator_id = element.creator_id.toString();
//                 });
//             }
//
//             return productList;
//         } catch (error) {
//             console.error(error);
//         }
//     }
//
//     static async readById(id) {
//         const database = getDatabase();
//
//         try {
//             const product = await database.collection('products').findOne({_id: new ObjectId(id)});
//
//             product.id = product._id.toString();
//             delete product._id;
//
//             product.creator_id = product.creator_id.toString();
//
//             return product;
//         } catch (error) {
//             console.error(error);
//         }
//     }
//
//     static async readByIds({idList}) {
//         const database = getDatabase()
//         const productsCol = database.collection('products');
//
//         try {
//             const objectIdList = idList.map((id) => new ObjectId(id));
//
//             const productList = await productsCol.find({
//                 _id: {$in: objectIdList},
//             }).toArray();
//
//             productList.map((product) => {
//                 product.id = product._id.toString();
//                 delete product._id;
//
//                 product.creator_id = product.creator_id.toString();
//             });
//
//             return productList;
//         } catch (error) {
//             console.error(error);
//         }
//     }
//
//     static async update({id, name, description, price, image}) {
//         const database = getDatabase();
//
//         try {
//             const product = await this.readById(id);
//             const updateData = {
//                 name: product.name,
//                 description: product.description,
//                 price: product.price,
//                 image: product.image,
//                 updated_at: new Date(),
//             };
//
//             if (name !== product.name) {
//                 updateData.name = name;
//             }
//             if (description !== product.description) {
//                 updateData.description = description;
//             }
//             if (price !== product.price) {
//                 updateData.price = price;
//             }
//             if (image !== product.image) {
//                 updateData.image = image;
//             }
//
//             await database.collection('products').updateOne({_id: new ObjectId(id)}, {$set: updateData});
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
//             await database.collection('products').updateOne({_id: new ObjectId(id)}, {$set: updateData});
//         } catch (error) {
//             console.error(error);
//         }
//     }
// }
//
// module.exports = Product;