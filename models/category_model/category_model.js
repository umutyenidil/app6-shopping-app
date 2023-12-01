const CategoryMongooseModel = require('./category_mongoose_model');

class CategoryModel {
    async create({creatorId, name, description}) {
        return CategoryMongooseModel.create({
            creatorId,
            name,
            description,
        });
    }

    async read({categoryId}) {
        return CategoryMongooseModel.read({
            categoryId
        });
    }

    async readAll() {
        return CategoryMongooseModel.readAll();
    }

    async update({categoryId, name, description}) {
        return CategoryMongooseModel.update({
            categoryId,
            name,
            description,
        });
    }

    async delete({categoryId}) {
        return CategoryMongooseModel.delete({
            categoryId
        });
    }
}

const instance = Object.freeze(new CategoryModel());

module.exports = instance;