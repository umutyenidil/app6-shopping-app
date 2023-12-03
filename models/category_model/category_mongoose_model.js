const CategoryMongoose = require("./category_mongoose");

class CategoryMongooseModel {
    async create({creatorId, name, description}) {
        const category = new CategoryMongoose({
            creatorId,
            name,
            description,
        });

        await category.save();
    }

    read({categoryId}) {
        return CategoryMongoose.findById(categoryId);
    }

    async readAll() {
        return CategoryMongoose.find({is_deleted: false});
    }

    async update({categoryId, name, description}) {
        await CategoryMongoose.updateOne({
                _id: categoryId
            },
            {
                name,
                description,
            });
    }

    async delete({categoryId}) {
        await CategoryMongoose.updateOne({_id: categoryId}, {is_deleted: 1, deleted_at: new Date()});
    }
}

const instance = Object.freeze(new CategoryMongooseModel());

module.exports = instance;