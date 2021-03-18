const BadRequestError = require('./types/badRequestError');

const handleValidationErrorDB = (err) => {
    const errors = Object.values(err.errors).map((el) => el.message);

    const message = `Invalid input data. ${errors.join('. ')}.`;
    return new BadRequestError(message);
};

const handleDuplicateFieldsDB = (err) => {
    const value = err.message.match(/"(.*?)"/)[1];
    // const value = err.message.match(/(["'])(?:\\.|[^\\])*?\1/)[0];

    const message = `Value '${value}' already in use. Please use another value.`;
    return new BadRequestError(message);
};

const handleRequestParsingError = (err) => {
    const message = `Request parsing error: ${err.message}`;
    return new BadRequestError(message);
};

module.exports = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch((err) => {
            let error = { ...err };
            error.name = err.name;
            error.message = err.message;

            if (error.type === 'entity.parse.failed') {
                error = handleRequestParsingError(error);
                return next(error);
            }
            if (error.name === 'ValidationError') {
                error = handleValidationErrorDB(error);
                return next(error);
            }
            if (error.code === 11000) {
                error = handleDuplicateFieldsDB(error);
                return next(error);
            }

            next(err);
        });
    };
};
