module.exports = (err, req, res, next) => {
    if (err.isOperational) {
        if (process.env.LOG_OPERATIONAL_ERRORS) console.error('ERROR ', err);

        return res.status(err.statusCode).json({
            status: err.status,
            errorCode: err.errorCode,
            message: err.message
        });
    }

    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    // Log unhandled error on server
    console.error('ERROR ', err);

    // If in dev mode send stack trace
    if (process.env.NODE_ENV === 'development') {
        return res.status(err.statusCode).json({
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack
        });
    }

    // Send generic error message
    return res.status(err.statusCode).json({
        status: 'error',
        message: 'An unexpected error occurred'
    });
};
