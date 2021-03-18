const BadRequestError = require('../errors/types/badRequestError');

module.exports = (req, res, next) => {
    if (
        req.body &&
        req.body.startDate &&
        !(
            req.body.startDate.match(
                /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/
            ) || req.body.startDate.match(/^\d{4}-\d{2}-\d{2}$/)
        )
    ) {
        return next(
            new BadRequestError('The start date should be in YYYY-MM-DD format')
        );
    }

    if (
        req.body &&
        req.body.endDate &&
        !(
            req.body.endDate.match(
                /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/
            ) || req.body.endDate.match(/^\d{4}-\d{2}-\d{2}$/)
        )
    )
        return next(
            new BadRequestError('The end date should be in YYYY-MM-DD format')
        );

    if (
        req.query &&
        req.query.startDate &&
        !req.query.startDate.match(/^\d{4}-\d{2}-\d{2}$/)
    )
        return next(
            new BadRequestError(
                'The date in your filter should be in YYYY-MM-DD format'
            )
        );

    if (
        req.query &&
        req.query.endDate &&
        !req.query.endDate.match(/^\d{4}-\d{2}-\d{2}$/)
    )
        return next(
            new BadRequestError(
                'The date in your filter should be in YYYY-MM-DD format'
            )
        );

    next();
};
