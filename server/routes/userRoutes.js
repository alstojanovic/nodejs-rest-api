const express = require('express');

const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const getMe = require('../middlewares/getMe');

const router = express.Router();

const subRoute = '/users';

router.get(`${subRoute}/me`, getMe, userController.getUser);
router.patch(`${subRoute}/update`, userController.updateMe);
router.patch(`${subRoute}/updatePassword`, authController.updatePassword);
router.delete(`${subRoute}/delete`, userController.deleteMe);

module.exports = router;
