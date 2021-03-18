class ApiError extends Error {
    constructor(message, statusCode, errorCode = 'API_ERROR') {
        super(message);

        this.statusCode = statusCode;
        this.errorCode = errorCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ApiError;
