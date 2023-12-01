const ProductMongooseModel = require('./product_mongoose_model');

class ProductModel {
    async create({creatorId, name, description, price, image, categories}) {
        return ProductMongooseModel.create({
            creatorId,
            name,
            description,
            price,
            image,
            categories,
        });
    }

    async read({productId}) {
        return ProductMongooseModel.read({
            productId,
        });
    }

    async readWithCategory({productId}) {
        return ProductMongooseModel.readWithCategory({
            productId,
        });
    }

    async readAll() {
        return ProductMongooseModel.readAll();
    }

    async update({productId, name, description, price, image, categories}) {
        return ProductMongooseModel.update({
            productId,
            name,
            description,
            price,
            image,
            categories
        });
    }

    async delete({productId}) {
        return ProductMongooseModel.delete({
            productId,
        });
    }
}

const instance = Object.freeze(new ProductModel());

module.exports = instance;