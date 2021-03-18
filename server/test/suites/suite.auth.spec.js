const chai = require('chai');

const User = require('../../db/models/userModel');
const UserData = require('../data/userData');
const Helpers = require('../helpers/helpers');

chai.should();

describe('Auth', () => {
    after(() => {
        Helpers.closeAgent();
    });

    beforeEach(async () => {
        await User.deleteMany({});
        await new User(UserData.testUser).save();
    });

    describe('Signup User', () => {
        it('should create new User', async () => {
            const res = await Helpers.signupUser(UserData.newUserData);
            res.should.have.status(201);
            res.body.should.have.property('status').eql('success');
            res.body.should.have.property('token');
            res.body.should.have.property('user');
        });

        it('should fail to create new User', async () => {
            const res = await Helpers.signupUser(
                UserData.incompleteSignupUserData
            );
            res.should.have.status(400);
            res.body.should.have.property('message');
        });
    });

    describe('Login User', () => {
        it('should login existing User', async () => {
            const res = await Helpers.loginUser(UserData.testUserData);
            res.should.have.cookie('jwt');
            res.should.have.status(200);
            res.body.should.have.property('status').eql('success');
            res.body.should.have.property('token');
            res.body.should.have.property('user');
        });

        it('should fail to login User with bad credentials', async () => {
            const res = await Helpers.loginUser(UserData.unregisteredUserData);
            res.should.not.have.cookie('jwt');
            res.should.have.status(401);
            res.body.should.have.property('message');
        });
    });

    describe('Logout User', () => {
        it('should logout existing User', async () => {
            await Helpers.loginUser(UserData.testUser);
            const res = await Helpers.logoutUser();
            res.should.have.cookie('jwt', 'loggedout');
            res.should.have.status(200);
            res.body.should.have.property('status').eql('success');
        });
    });

    describe('Forgot password', () => {
        it('should create password reset token and send email', async () => {
            const res = await Helpers.forgotPassword(
                UserData.forgotPasswordData
            );
            res.should.have.status(200);
            res.body.should.have.property('status').eql('success');
            res.body.should.have
                .property('message')
                .eql('Token sent to email!');
            res.body.should.have.property('token');
        });
    });

    describe('Reset password', () => {
        it('should create password reset token and send email', async () => {
            const forgotPasswordRes = await Helpers.forgotPassword(
                UserData.forgotPasswordData
            );

            const token = forgotPasswordRes.body.token;

            const res = await Helpers.resetPassword(
                token,
                UserData.resetPasswordData
            );
            res.should.have.status(200);
            res.body.should.have.property('status').eql('success');
            res.body.should.have.property('token');
            res.body.should.have.property('user');
        });
    });
});
