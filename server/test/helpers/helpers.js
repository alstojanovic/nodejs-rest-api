const chaiHttp = require('chai-http');
const chai = require('chai');

chai.use(chaiHttp);

const api = `api/${process.env.API_VERSION}`;
const agent = chai.request.agent(
    `http://${process.env.TESTS_TARGET_HOST}:${process.env.PORT}/${api}`
);

exports.closeAgent = () => agent.close();

// Auth routes helpers
exports.signupUser = (userData) => agent.post('/signup').send(userData);
exports.loginUser = (userData) => agent.post('/login').send(userData);
exports.logoutUser = () => agent.post('/logout');
exports.forgotPassword = (forgotPasswordData) =>
    agent.post('/forgotPassword').send(forgotPasswordData);
exports.resetPassword = (token, resetPasswordData) =>
    agent.patch(`/resetPassword/${token}`).send(resetPasswordData);

//  Users routes helpers
exports.getSelf = () => agent.get('/users/me');
exports.updateSelf = (updateData) =>
    agent.patch('/users/update').send(updateData);
exports.updatePassword = (passwordUpdateData) =>
    agent.patch('/users/updatePassword').send(passwordUpdateData);
exports.deleteAccount = () => agent.delete('/users/delete');
exports.getAllUsers = () => agent.get('/admin/users');
exports.getUserById = (id) => agent.get(`/admin/users/${id}`);
exports.createUser = (userData) => agent.post('/admin/users').send(userData);
exports.updateUser = (id, userData) =>
    agent.patch(`/admin/users/${id}`).send(userData);
exports.deleteUserById = (id) => agent.delete(`/admin/users/${id}`);

// Deposit routes helpers
exports.getDeposits = () => agent.get('/deposits');
exports.getDepositById = (id) => agent.get(`/deposits/${id}`);
exports.createDeposit = (depositData) =>
    agent.post('/deposits').send(depositData);
exports.upateDeposit = (id, depositData) =>
    agent.patch(`/deposits/${id}`).send(depositData);
exports.deleteDeposit = (id) => agent.delete(`/deposits/${id}`);
exports.getAllDeposits = () => agent.get('/admin/deposits');
exports.getDepositAsAdmin = (id) => agent.get(`/admin/deposits/${id}`);
exports.createDepositAsAdmin = (depositData) =>
    agent.post('/admin/deposits').send(depositData);
exports.updateDepositAsAdmin = (id, depositData) =>
    agent.patch(`/admin/deposits/${id}`).send(depositData);
exports.deleteDepositAsAdmin = (id) => agent.delete(`/admin/deposits/${id}`);

// Report routes helpers
exports.getReport = () => agent.get('/users/me/report');
exports.getReportAsAdmin = (userId) =>
    agent.get(`/admin/users/${userId}/report`);
