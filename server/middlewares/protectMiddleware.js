const jwt = require('jsonwebtoken');

const catchAsync = require('../errors/catchAsync');
const User = require('../db/models/userModel');
const UnauthorizedError = require('../errors/types/unauthorizedError');

const readToken = (req) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (req.cookies && req.cookies.jwt) {
        token = req.cookies.jwt;
    }

    return token;
};

const decodeToken = (token, secret) => {
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            throw new UnauthorizedError('Invalid token. Please log in again!');
        }

        if (error.name === 'TokenExpiredError') {
            throw new UnauthorizedError(
                'Your token has expired! Please log in again.'
            );
        }

        throw error;
    }
};

const protect = catchAsync(async (req, res, next) => {
    const token = readToken(req);
    if (!token) {
        return next(
            new UnauthorizedError(
                'You are not logged in! Please log in to get access.'
            )
        );
    }

    const decoded = decodeToken(token, process.env.JWT_SECRET);

    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
        return next(
            new UnauthorizedError(
                'User belonging to this token does not exist.'
            )
        );
    }

    if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next(
            new UnauthorizedError(
                'You recently changed password! Please log in again.'
            )
        );
    }

    req.user = currentUser;
    next();
});

module.exports = protect;
