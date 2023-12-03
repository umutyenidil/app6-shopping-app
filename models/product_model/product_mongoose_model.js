const ProductMongoose = require("./product_mongoose");
const {ObjectId} = require("mongodb");

class ProductMongooseModel {
    async create({creatorId, name, description, price, image, categories}) {
        const product = new ProductMongoose({
            creator_id: new ObjectId(creatorId),
            name,
            description,
            price,
            image,
            categories: categories.map((categoryId) => new ObjectId(categoryId)),
        });

        await product.save();
    }

    async read({productId}) {
        return ProductMongoose.findById(productId);
    }

    async readWithCategory({productId}) {
        return ProductMongoose.findById(productId).populate('categories');
    }

    async readAll() {
        return ProductMongoose.find({is_deleted: false});

    }

    async readAllByCategoryId({categoryId}) {
        const productList = await ProductMongoose.find(
            {
                categories: {
                    $in: [categoryId]
                },
                is_deleted: false
            }
        );

        return productList;
    }

    async update({productId, name, description, price, image, categories}) {
        await ProductMongoose.updateOne(
            {
                _id: productId
            },
            {
                name,
                description,
                price,
                image,
                categories,
            }
        );
    }

    async delete({productId}) {
        await ProductMongoose.updateOne({_id: productId}, {is_deleted: 1, deleted_at: new Date()});
    }
}

const instance = Object.freeze(new ProductMongooseModel());

module.exports = instance;