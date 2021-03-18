const ForbiddenError = require('../errors/types/forbiddenError');

module.exports = (req, res, next) => {
    if (req.body.password)
        return next(
            new ForbiddenError(
                "Cannot change a User's password using this route. Please use /passwordReset"
            )
        );
    next();
};
