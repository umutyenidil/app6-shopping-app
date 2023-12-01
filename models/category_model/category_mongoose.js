const mongoose = require('mongoose');

const categorySchema = mongoose.Schema(
    {
        creator_id: {
            ref: 'User',
            type: mongoose.Schema.Types.ObjectId,
            alias: 'creatorId',
        },
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
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
                console.log('test');
            }
        },
        // static methods for the Product model
        statics: {
            async softDelete(id) {
                await Category.updateOne({_id: id}, {is_deleted: 1, deleted_at: new Date()});
            },
            async findNotDeletedDocuments() {
                return Category.where({is_deleted: false});
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


categorySchema.pre('updateOne', function () {
    this.set({ updated_at: new Date() });
});

const CategoryMongoose = mongoose.model('Category', categorySchema);

module.exports = CategoryMongoose;