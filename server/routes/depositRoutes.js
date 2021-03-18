const express = require('express');

const depositController = require('../controllers/depositController');
const filterOwned = require('../middlewares/filterOwned');
const isMyDeposit = require('../middlewares/isMyDeposit');
const setUserAsOwner = require('../middlewares/setUserAsOwner');
const validateDateFormat = require('../middlewares/validateDateFormat');

const router = express.Router();

const subRoute = '/deposits';

router
    .route(`${subRoute}`)
    .get(validateDateFormat, filterOwned, depositController.getAllDeposits)
    .post(validateDateFormat, setUserAsOwner, depositController.createDeposit);

router.use(`${subRoute}/:id`, isMyDeposit);
router
    .route(`${subRoute}/:id`)
    .get(depositController.getDeposit)
    .patch(depositController.updateDeposit)
    .delete(depositController.deleteDeposit);

module.exports = router;
