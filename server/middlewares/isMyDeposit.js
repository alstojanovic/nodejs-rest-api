const catchAsync = require('../errors/catchAsync');
const Deposit = require('../db/models/depositModel');
const ForbiddenError = require('../errors/types/ForbiddenError');
const NotFoundError = require('../errors/types/NotFoundError');

module.exports = catchAsync(async (req, res, next) => {
    const deposit = await Deposit.findById(req.params.id);
    if (!deposit) {
        return next(new NotFoundError('No document found with that ID'));
    }

    if (req.user.id !== deposit.owner.id) {
        return next(
            new ForbiddenError(
                "You don't have permission to access this deposit"
            )
        );
    }

    next();
});
