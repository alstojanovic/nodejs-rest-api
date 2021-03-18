const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, 'Please tell us your first name'],
            trim: true,
        },
        lastName: {
            type: String,
            required: [true, 'Please tell us your last name'],
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            required: [true, 'Please provide your email'],
            trim: true,
            lowercase: true,
            validate: [validator.isEmail, 'Please provide a valid email'],
        },
        role: {
            type: String,
            enum: ['USER', 'MANAGER', 'ADMIN'],
            default: 'USER',
        },
        password: {
            type: String,
            required: [true, 'Please provide a password'],
            minlength: [7, 'Password must have at least 7 characters'],
        },
        passwordConfirm: {
            type: String,
            required: [true, 'Please confirm your password'],
            validate: {
                // This only works on CREATE and SAVE!!!
                validator: function (el) {
                    return el === this.password;
                },
                message: 'Passwords are not the same',
            },
            select: false,
        },
        passwordChangedAt: Date,
        passwordResetToken: String,
        passwordResetExpires: Date,
        active: {
            type: Boolean,
            default: true,
            select: false,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.pre('save', async function (next) {
    // Only run this function if password was actually modified
    if (!this.isModified('password')) return next();

    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);

    // Delete passwordConfirm field
    this.passwordConfirm = undefined;
    next();
});

userSchema.pre('save', function (next) {
    if (!this.isModified('password') || this.isNew) return next();

    this.passwordChangedAt = Date.now() - 1000;
    next();
});

userSchema.pre(/^find/, function (next) {
    // this points to the current query
    this.find({ active: { $ne: false } });
    next();
});

userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    delete userObject.__v;
    delete userObject.updatedAt;
    delete userObject.password;
    delete userObject.passwordConfirm;
    delete userObject.passwordChangedAt;
    delete userObject.passwordResetToken;
    delete userObject.passwordResetExpires;

    return userObject;
};

userSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(
            this.passwordChangedAt.getTime() / 1000,
            10
        );

        return JWTTimestamp < changedTimestamp;
    }

    // False means NOT changed
    return false;
};

userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.passwordResetToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
