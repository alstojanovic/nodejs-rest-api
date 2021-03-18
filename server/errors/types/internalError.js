const ApiError = require('../apiError');

class InternalError extends ApiError {
    constructor(message) {
        super(message, 500, 'INTERNAL');
    }
}

module.exports = InternalError;
