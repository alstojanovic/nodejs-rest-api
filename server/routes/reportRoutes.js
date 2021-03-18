const express = require('express');

const depositController = require('../controllers/depositController');
const restrictTo = require('../middlewares/restrictToMiddleware');
const validateDateFormat = require('../middlewares/validateDateFormat');
const getMe = require('../middlewares/getMe');

const router = express.Router();

const subRoute = '/users';

router.use(validateDateFormat);

router.get(`${subRoute}/me/report`, getMe, depositController.generateReport);

router.get(
    `/admin${subRoute}/:id/report`,
    restrictTo('ADMIN'),
    depositController.generateReport
);

module.exports = router;
