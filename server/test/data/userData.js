const ObjectID = require('mongodb').ObjectID;

const testUser = {
    _id: new ObjectID(),
    firstName: 'Test',
    lastName: 'Testings',
    email: 'TestUser@email.com',
    password: 'password12345',
    passwordConfirm: 'password12345',
};

const adminUser = {
    _id: new ObjectID(),
    firstName: 'Admin',
    lastName: 'Adminski',
    email: 'AdminUser@email.com',
    password: 'password12345',
    passwordConfirm: 'password12345',
    role: 'ADMIN',
};

exports.testUser = testUser;

exports.testUserData = {
    firstName: testUser.firstName,
    firstName: testUser.firstName,
    email: testUser.email,
    password: testUser.password,
    passwordConfirm: testUser.passwordConfirm,
};

exports.adminUser = adminUser;
exports.adminUserData = {
    firstName: adminUser.firstName,
    firstName: adminUser.firstName,
    email: adminUser.email,
    password: adminUser.password,
    passwordConfirm: adminUser.passwordConfirm,
};

exports.newUserData = {
    firstName: 'Test',
    lastName: 'Testings',
    email: 'NewUser@email.com',
    password: testUser.password,
    passwordConfirm: testUser.password,
};

exports.incompleteSignupUserData = {
    email: 'IncompleteUser@email.com',
};

exports.unregisteredUserData = {
    email: 'UnknownUser@email.com',
    password: 'unknownPass',
};

exports.forgotPasswordData = {
    email: testUser.email,
};

exports.resetPasswordData = {
    password: 'newpass12345',
    passwordConfirm: 'newpass12345',
};

exports.updateUserData = {
    firstName: 'NewName',
};

exports.passwordUpdateData = {
    currentPassword: testUser.password,
    newPassword: 'newpassword123',
    newPasswordConfirm: 'newpassword123',
};
