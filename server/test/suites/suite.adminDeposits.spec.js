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

    describe('Get all deposits', () => {
        it('should return all deposits in the system', async () => {
            await Helpers.loginUser(UserData.adminUser);
            const res = await Helpers.getAllDeposits();
            res.should.have.status(200);
            res.body.should.have.property('status').eql('success');
            res.body.should.have.property('data');
        });
    });

    describe('Create deposit as Admin', () => {
        it('should create deposit for existing User', async () => {
            await Helpers.loginUser(UserData.adminUser);
            const createDepositData = {
                ...DepositData.newDepositData,
                owner: UserData.testUser._id,
            };
            const res = await Helpers.createDepositAsAdmin(createDepositData);
            res.should.have.status(201);
            res.body.should.have.property('status').eql('success');
            res.body.should.have.property('data');
        });
    });

    describe('Get deposit by id', () => {
        it('should get deposit by id', async () => {
            await Helpers.loginUser(UserData.adminUser);
            const res = await Helpers.getDepositAsAdmin(
                DepositData.testDeposit1._id
            );
            res.should.have.status(200);
            res.body.should.have.property('status').eql('success');
            res.body.should.have.property('data');
            res.body.data.should.have
                .property('_id')
                .eql(DepositData.testDeposit1._id.toString());
        });
    });

    describe('Update deposit as Admin', () => {
        it('should update existing deposit', async () => {
            await Helpers.loginUser(UserData.adminUser);
            const res = await Helpers.updateDepositAsAdmin(
                DepositData.testDeposit2._id,
                DepositData.updateDepositData
            );
            res.should.have.status(200);
            res.body.should.have.property('status').eql('success');
            res.body.should.have.property('data');
            res.body.data.should.have
                .property('amount')
                .eql(DepositData.updateDepositData.amount);
        });
    });

    describe('Delete deposit as Admin', () => {
        it('should delete existing deposit', async () => {
            await Helpers.loginUser(UserData.adminUser);
            const res = await Helpers.deleteDepositAsAdmin(
                DepositData.testDeposit1._id
            );
            res.should.have.status(204);
        });
    });
});
