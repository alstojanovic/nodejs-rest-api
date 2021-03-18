const express = require('express');

const authController = require('../controllers/authController');
const protectMiddleware = require('../middlewares/protectMiddleware');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.use(protectMiddleware);

module.exports = router;
