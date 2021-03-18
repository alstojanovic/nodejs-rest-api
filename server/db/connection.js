const mongoose = require('mongoose');

const connectDb = async () => {
    console.log('Connecting to the database...');
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
        console.log('DB connection successful!');
    } catch (error) {
        console.log('Error connecting to the database! \n', error);
    }
};

module.exports = connectDb;
