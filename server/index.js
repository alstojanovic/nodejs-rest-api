const connectDb = require('./db/connection');

process.on('uncaughtException', (err) => {
    console.log('UNCAUGHT EXCEPTION! Shutting down...');
    console.log(err.name, err.message, err.stack);
    process.exit(1);
});

connectDb();

const app = require('./app');

const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => {
    console.log('Server is up on port ' + PORT);
});

process.on('unhandledRejection', (err) => {
    console.log('UNHANDLED REJECTION! Shutting down...');
    console.log(err.name, err.message, err.stack);
    server.close(() => {
        process.exit(1);
    });
});

process.on('SIGTERM', () => {
    console.log('SIGTERM RECEIVED. Shutting down gracefully');
    server.close(() => {
        console.log('Process terminated!');
    });
});
