const ApiError = require('../apiError');

class NotFoundError extends ApiError {
    constructor(message) {
        super(message, 404, 'NOT_FOUND');
    }
}

module.exports = NotFoundError;
