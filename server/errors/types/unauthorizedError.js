const ApiError = require('../apiError');

class UnauthorizedError extends ApiError {
    constructor(message) {
        super(message, 401, 'UNAUTHORIZED');
    }
}

module.exports = UnauthorizedError;
