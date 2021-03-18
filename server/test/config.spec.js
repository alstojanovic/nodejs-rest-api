const connectDb = require('../db/connection');

describe('Connect to database', () => {
    it('Should connect to test database', async () => {
        await connectDb();
    });
});
