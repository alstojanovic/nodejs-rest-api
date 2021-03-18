const catchAsync = require('../errors/catchAsync');
const ForbiddenError = require('../errors/types/forbiddenError');
const User = require('../db/models/userModel');

module.exports = catchAsync(async (req, res, next) => {
    if (req.user.role === 'MANAGER' && req.body.role === 'ADMIN') {
        return next(
            new ForbiddenError("You don't have permission to set this role")
        );
    }

    if (req.route.path === '/:id') {
        const user = await User.findById(req.params.id);

        if (req.user.role === 'MANAGER' && user.role === 'ADMIN') {
            return next(
                new ForbiddenError("You don't have permission to set this role")
            );
        }
    }

    next();
});
