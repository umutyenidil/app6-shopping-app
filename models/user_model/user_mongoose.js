const mongoose = require('mongoose');

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
                        product: {
                            ref: 'Product',
                            type: mongoose.Schema.Types.ObjectId,
                            required: true,
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
);

// todo: tum mongoose modellerin pre('save') metotlarini kontrol et

userSchema.pre('save', function () {
    this.set(
        {
            updated_at: new Date(),
            cart: {
                items: [],
            }
        }
    );
});

// todo: tum mongoose modellerin pre('updateOne') metotlarini kontrol et

userSchema.pre('updateOne', function (next) {
    this.set(
        {
            updated_at: new Date()
        }
    );

    if (this._update.is_deleted === true) {
        this.set(
            {
                deleted_at: new Date()
            }
        );
    }

    next();
});


const UserMongoose = mongoose.model('User', userSchema);

module.exports = UserMongoose;