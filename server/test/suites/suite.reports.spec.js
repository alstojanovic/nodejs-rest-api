const chai = require('chai');

const User = require('../../db/models/userModel');
const Deposit = require('../../db/models/depositModel');
const UserData = require('../data/userData');
const DepositData = require('../data/depositData');
const Helpers = require('../helpers/helpers');

chai.should();

describe('Admin deposits', () => {
    after(() => {
        Helpers.closeAgent();
    });

    beforeEach(async () => {
        await Deposit.deleteMany({});
        await User.deleteMany({});
        await new User(UserData.adminUser).save();
        await new User(UserData.testUser).save();
        await new Deposit(DepositData.testDeposit1).save();
        await new Deposit(DepositData.testDeposit2).save();
        await new Deposit(DepositData.testDeposit3).save();
    });

    describe('Get report', () => {
        it('should get report', async () => {
            await Helpers.loginUser(UserData.testUser);
            const res = await Helpers.getReport();
            res.should.have.status(200);
            res.body.should.have.property('status').eql('success');
            res.body.should.have.property('data');
        });
    });

    describe('Get report as Admin', () => {
        it('should get report for existing User', async () => {
            await Helpers.loginUser(UserData.adminUser);
            const res = await Helpers.getReportAsAdmin(UserData.testUser._id);
            res.should.have.status(200);
            res.body.should.have.property('status').eql('success');
            res.body.should.have.property('data');
        });
    });
});
