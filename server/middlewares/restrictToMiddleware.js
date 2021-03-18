const ForbiddenError = require('../errors/types/forbiddenError');

const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            // If we want to hide a feature from the user we may send a NotFoundError instead
            return next(
                new ForbiddenError(
                    'You do not have permission to perform this action'
                )
            );
        }

        next();
    };
};

module.exports = restrictTo;
