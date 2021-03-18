const mongoose = require('mongoose');

const depositSchema = new mongoose.Schema(
    {
        bankName: {
            type: String,
            required: [true, 'Please tell us your bank name for this deposit'],
            trim: true
        },
        accountNumber: {
            type: String,
            required: [true, 'Please tell us your bank number'],
            validate: [/^\d+$/, 'Account number can contain only digits'],
            maxlength: [17, 'Account number can have a maximum of 17 digits']
        },
        startDate: {
            type: Date,
            required: [true, 'Please tell us the start date of the deposit']
        },
        endDate: {
            type: Date,
            required: [true, 'Please tell us the end date of the deposit'],
            validate: {
                validator: function(el) {
                    return el >= this.startDate;
                },
                message: 'End date must be after start date'
            }
        },
        amount: {
            type: Number,
            required: [true, 'Please tell us the deposit amount'],
            min: [0, 'Deposit amount must be positive']
        },
        interest: {
            type: Number,
            required: [true, 'Please tell us the interest rate for the deposit']
        },
        tax: {
            type: Number,
            required: [true, 'Please tell us the tax rate on the deposit'],
            min: [0, 'Tax percentage must be positive']
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, 'Deposit owner id is required'],
            ref: 'User'
        }
    },
    {
        timestamps: true
    }
);

depositSchema.pre(/^find/, function(next) {
    this.populate({
        path: 'owner',
        select: '-__v -passwordChangedAt -role'
    });

    next();
});

const Deposit = mongoose.model('Deposit', depositSchema);

module.exports = Deposit;
