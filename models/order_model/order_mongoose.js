const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            alias: 'userId',
            ref: 'User',
            require: true,
        },
        items: {
            type: [
                {
                    product: {
                        type: Object,
                        required: true,
                    },
                    quantity: {
                        type: Number,
                        required: true,
                    }
                }
            ],
        },
        totalPrice: {
            type: Number,
            default: 0,
        },
        created_at: {
            type: Date,
            default: Date.now,
        },
    }
);

orderSchema.pre('save', function (next) {
    const total = this.items.reduce((sum, currentItem) => {
        const price = currentItem.product.price * currentItem.quantity;
        return sum + price;
    }, 0);

    this.set(
        {
            totalPrice: total,
        }
    );

    next();
});


const OrderMongoose = mongoose.model('Order', orderSchema);

module.exports = OrderMongoose;