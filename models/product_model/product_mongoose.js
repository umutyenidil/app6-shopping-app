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
);

productSchema.pre('updateOne', function (next) {
    this.set({updated_at: new Date()});

    next();
});

const ProductMongoose = mongoose.model('Product', productSchema);

module.exports = ProductMongoose;
