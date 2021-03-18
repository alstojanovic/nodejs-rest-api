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
    });

    describe('Get Self', () => {
        it('should return logged in User', async () => {
            await Helpers.loginUser(Data.testUser);
            const res = await Helpers.getSelf();
            res.should.have.status(200);
            res.body.should.have.property('status').eql('success');
            res.body.should.have.property('data');
        });
    });

    describe('Update Self', () => {
        it('should update User', async () => {
            await Helpers.loginUser(Data.testUser);
            const res = await Helpers.updateSelf(Data.updateUserData);
            res.should.have.status(200);
            res.body.should.have.property('status').eql('success');
            res.body.should.have.property('user');
        });
    });

    describe('Update own password', () => {
        it("should update User's password", async () => {
            await Helpers.loginUser(Data.testUser);
            const res = await Helpers.updatePassword(Data.passwordUpdateData);
            res.should.have.status(200);
            res.body.should.have.property('status').eql('success');
            res.body.should.have.property('token');
            res.body.should.have.property('user');
        });
    });

    describe('Delete account', () => {
        it('should delete User', async () => {
            await Helpers.loginUser(Data.testUser);
            const res = await Helpers.deleteAccount();
            res.should.have.status(204);
        });
    });
});
