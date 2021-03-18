const chai = require('chai');

const User = require('../../db/models/userModel');
const Data = require('../data/userData');
const Helpers = require('../helpers/helpers');

chai.should();

describe('Users', () => {
    after(() => {
        Helpers.closeAgent();
    });

    beforeEach(async () => {
        await User.deleteMany({});
        await new User(Data.testUser).save();
        await new User(Data.adminUser).save();
    });

    describe('Get Users', () => {
        it('should return all users', async () => {
            await Helpers.loginUser(Data.adminUserData);
            const res = await Helpers.getAllUsers();
            res.should.have.status(200);
            res.body.should.have.property('status').eql('success');
            res.body.should.have.property('data');
        });
    });

    describe('Get User with id', () => {
        it('should return User with id', async () => {
            await Helpers.loginUser(Data.adminUserData);
            const res = await Helpers.getUserById(Data.testUser._id);
            res.should.have.status(200);
            res.body.should.have.property('status').eql('success');
            res.body.should.have.property('data');
        });
    });

    describe('Create User', () => {
        it('should create a new User', async () => {
            await Helpers.loginUser(Data.adminUserData);
            const res = await Helpers.createUser(Data.newUserData);
            res.should.have.status(201);
            res.body.should.have.property('status').eql('success');
            res.body.should.have.property('data');
        });
    });

    describe('Update User', () => {
        it('should update existing User', async () => {
            await Helpers.loginUser(Data.adminUserData);
            const res = await Helpers.updateUser(
                Data.testUser._id,
                Data.updateUserData
            );
            res.should.have.status(200);
            res.body.should.have.property('status').eql('success');
            res.body.should.have.property('data');
        });
    });

    describe('Delete User', () => {
        it('should delete existing User', async () => {
            await Helpers.loginUser(Data.adminUserData);
            const res = await Helpers.deleteUserById(Data.testUser._id);
            res.should.have.status(204);
        });
    });
});
