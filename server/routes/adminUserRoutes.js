const express = require('express');

const userController = require('../controllers/userController');
const restrictTo = require('../middlewares/restrictToMiddleware');
const checkRolePermissions = require('../middlewares/checkRolePermissions');
const isNotChangingPassword = require('../middlewares/isNotChangingPassword');

const router = express.Router();

const subRoute = '/admin/users';

router.use(subRoute, restrictTo('ADMIN', 'MANAGER'));

router
    .route(subRoute)
    .get(userController.getAllUsers)
    .post(checkRolePermissions, userController.createUser);

router
    .route(`${subRoute}/:id`)
    .get(userController.getUser)
    .patch(
        checkRolePermissions,
        isNotChangingPassword,
        userController.updateUser
    )
    .delete(checkRolePermissions, userController.deleteUser);

module.exports = router;
