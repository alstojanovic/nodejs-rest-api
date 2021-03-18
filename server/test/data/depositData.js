const ObjectID = require('mongodb').ObjectID;
const UserData = require('./userData');

const testDeposit1 = {
    _id: new ObjectID(),
    bankName: 'Barclays',
    accountNumber: '6473283648247',
    startDate: new Date(),
    endDate: new Date(),
    amount: 1000,
    interest: 11,
    tax: 10,
    owner: UserData.testUser._id,
};

exports.testDeposit1 = testDeposit1;
exports.testDeposit1Data = {
    bankName: testDeposit1.bankName,
    accountNumber: testDeposit1.accountNumber,
    startDate: testDeposit1.startDate,
    endDate: testDeposit1.endDate,
    amount: testDeposit1.amount,
    interest: testDeposit1.interest,
    tax: testDeposit1.tax,
    owner: testDeposit1.owner,
};

const testDeposit2 = {
    _id: new ObjectID(),
    bankName: 'Deutche',
    accountNumber: '376432875423',
    startDate: new Date(),
    endDate: new Date(),
    amount: 2500,
    interest: 13,
    tax: 10,
    owner: UserData.testUser._id,
};

exports.testDeposit2 = testDeposit2;
exports.testDeposit2Data = {
    bankName: testDeposit2.bankName,
    accountNumber: testDeposit2.accountNumber,
    startDate: testDeposit2.startDate,
    endDate: testDeposit2.endDate,
    amount: testDeposit2.amount,
    interest: testDeposit2.interest,
    tax: testDeposit2.tax,
    owner: testDeposit2.owner,
};

const testDeposit3 = {
    _id: new ObjectID(),
    bankName: 'Goldman Sachs',
    accountNumber: '46725342133',
    startDate: new Date(),
    endDate: new Date(),
    amount: 15000,
    interest: 17,
    tax: 12,
    owner: UserData.testUser._id,
};

exports.testDeposit3 = testDeposit3;
exports.testDeposit3Data = {
    bankName: testDeposit3.bankName,
    accountNumber: testDeposit3.accountNumber,
    startDate: testDeposit3.startDate,
    endDate: testDeposit3.endDate,
    amount: testDeposit3.amount,
    interest: testDeposit3.interest,
    tax: testDeposit3.tax,
    owner: testDeposit3.owner,
};

exports.newDepositData = {
    bankName: 'Morgan Stanley',
    accountNumber: '321475328451',
    startDate: new Date(),
    endDate: new Date(),
    amount: 23000,
    interest: 18,
    tax: 12,
};

exports.updateDepositData = {
    amount: 28000,
};
