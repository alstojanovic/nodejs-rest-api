const express = require('express');
// const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');
const adminUserRouter = require('./routes/adminUserRoutes');
const depositRouter = require('./routes/depositRoutes');
const reportRouter = require('./routes/reportRoutes');
const adminDepositRouter = require('./routes/adminDepositRoutes');
const NotFoundError = require('./errors/types/NotFoundError');
const globalErrorMiddleware = require('./middlewares/globalErrorMiddleware');

const app = express();

app.enable('trust proxy');

app.use(cors());
app.options('*', cors());

app.use(express.json());
app.use(cookieParser());

const baseRoute = `/api/${process.env.API_VERSION}`;

// api routes
app.use(baseRoute, authRouter);
app.use(baseRoute, userRouter);
app.use(baseRoute, adminUserRouter);
app.use(baseRoute, reportRouter);
app.use(baseRoute, depositRouter);
app.use(baseRoute, adminDepositRouter);

// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static('client/build'));

//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//     });
// }

app.all('*', (req, res, next) => {
    next(new NotFoundError(`Can't find ${req.originalUrl} on this server!`));
});

app.use(globalErrorMiddleware);

module.exports = app;
