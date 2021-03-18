const ApiError = require('../apiError');

class BadRequestError extends ApiError {
    constructor(message) {
        super(message, 400, 'BAD_REQUEST');
    }
}

module.exports = BadRequestError;
