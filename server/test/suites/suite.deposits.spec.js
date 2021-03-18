const chai = require('chai');

const User = require('../../db/models/userModel');
const Deposit = require('../../db/models/depositModel');
const UserData = require('../data/userData');
const DepositData = require('../data/depositData');
const Helpers = require('../helpers/helpers');

chai.should();

describe('Deposits', () => {
    after(() => {
        Helpers.closeAgent();
    });

    beforeEach(async () => {
        await Deposit.deleteMany({});
        await User.deleteMany({});
        await new User(UserData.testUser).save();
        await new Deposit(DepositData.testDeposit1).save();
        await new Deposit(DepositData.testDeposit2).save();
        await new Deposit(DepositData.testDeposit3).save();
    });

    describe('Get all deposits', () => {
        it('should return all deposits owned by logged in User', async () => {
            await Helpers.loginUser(UserData.testUser);
            const res = await Helpers.getDeposits();
            res.should.have.status(200);
            res.body.should.have.property('status').eql('success');
            res.body.should.have.property('data');
        });
    });

    describe('Create deposit', () => {
        it('should create deposit for logged in User', async () => {
            await Helpers.loginUser(UserData.testUser);
            const res = await Helpers.createDeposit(DepositData.newDepositData);
            res.should.have.status(201);
            res.body.should.have.property('status').eql('success');
            res.body.should.have.property('data');
        });
    });

    describe('Get deposit by id', () => {
        it("should get User's deposit", async () => {
            await Helpers.loginUser(UserData.testUser);
            const res = await Helpers.getDepositById(
                DepositData.testDeposit1._id
            );
            res.should.have.status(200);
            res.body.should.have.property('status').eql('success');
            res.body.should.have.property('data');
            res.body.data.should.have.property('owner');
            res.body.data.owner.should.have
                .property('_id')
                .eql(UserData.testUser._id.toString());
        });
    });

    describe('Update deposit', () => {
        it("should update User's deposit", async () => {
            await Helpers.loginUser(UserData.testUser);
            const res = await Helpers.upateDeposit(
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

    describe('Delete deposit', () => {
        it("should delete User's deposit", async () => {
            await Helpers.loginUser(UserData.testUser);
            const res = await Helpers.deleteDeposit(
                DepositData.testDeposit1._id
            );
            res.should.have.status(204);
        });
    });
});
