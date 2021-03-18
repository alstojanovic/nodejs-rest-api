const ApiError = require('../apiError');

class ForbiddenError extends ApiError {
    constructor(message) {
        super(message, 403, 'FORBIDDEN');
    }
}

module.exports = ForbiddenError;
