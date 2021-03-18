const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const User = require('../db/models/userModel');
const catchAsync = require('../errors/catchAsync');
const BadRequestError = require('../errors/types/badRequestError');
const UnauthorizedError = require('../errors/types/unauthorizedError');
const NotFoundError = require('../errors/types/notFoundError');
const InternalError = require('../errors/types/internalError');
const Email = require('../utils/email');

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

const createSendToken = (user, statusCode, req, res) => {
    const token = signToken(user._id);

    res.cookie('jwt', token, {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
    });

    res.status(statusCode).json({
        status: 'success',
        token,
        user,
    });
};

exports.signup = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
    });

    new Email(newUser).sendWelcome();

    createSendToken(newUser, 201, req, res);
});

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new BadRequestError('Please provide email and password!'));
    }
    const user = await User.findOne({ email });

    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new UnauthorizedError('Incorrect email or password'));
    }

    createSendToken(user, 200, req, res);
});

exports.logout = (req, res) => {
    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
    });

    res.status(200).json({ status: 'success' });
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new NotFoundError('There is no user with email address.'));
    }

    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    try {
        const resetURL = `${process.env.CLIENT_HOST}/resetPassword/${resetToken}`;
        new Email(user, resetURL).sendPasswordReset();

        res.status(200).json({
            status: 'success',
            message: 'Token sent to email!',
            token: resetToken,
        });
    } catch (err) {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({ validateBeforeSave: false });

        return next(
            new InternalError(
                'There was an error sending the email. Try again later!'
            )
        );
    }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
    const hashedToken = crypto
        .createHash('sha256')
        .update(req.params.token)
        .digest('hex');

    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
        return next(new BadRequestError('Token is invalid or has expired'));
    }

    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    createSendToken(user, 200, req, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    if (
        !(await user.correctPassword(req.body.currentPassword, user.password))
    ) {
        return next(new UnauthorizedError('Your current password is wrong.'));
    }

    user.password = req.body.newPassword;
    user.passwordConfirm = req.body.newPasswordConfirm;
    await user.save();

    createSendToken(user, 200, req, res);
});
