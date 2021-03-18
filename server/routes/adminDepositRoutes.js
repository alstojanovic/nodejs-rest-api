const express = require('express');

const depositController = require('../controllers/depositController');
const restrictTo = require('../middlewares/restrictToMiddleware');
const validateDateFormat = require('../middlewares/validateDateFormat');

const router = express.Router();

const subRoute = '/admin/deposits';

router.use(subRoute, restrictTo('ADMIN'));
router.use(subRoute, validateDateFormat);

router
    .route(`${subRoute}/`)
    .get(depositController.getAllDeposits)
    .post(depositController.createDeposit);

router
    .route(`${subRoute}/:id`)
    .get(depositController.getDeposit)
    .patch(depositController.updateDeposit)
    .delete(depositController.deleteDeposit);

module.exports = router;
