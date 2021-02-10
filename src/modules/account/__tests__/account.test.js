import chaihttp from 'chai-http';
import chai, { expect } from 'chai';
import { omit } from 'lodash';
import server from '../../../server';
import account from './account.dummy';
import cleanAllTables from '../../../utils/fixtures/database.fixture';
import { createUser } from '../../../utils/fixtures/user.fixture';

chai.use(chaihttp);
const router = () => chai.request(server);

let userId;

describe('/register', async () => {
  before(async () => {
    await cleanAllTables();
    await createUser();
  });
  it('users should be able to create an account with correct body', (done) => {
    router()
      .post('/api/v1/user/register')
      .send(account[1])
      .end((error, response) => {
        expect(response).to.have.status([201]);
        expect(response.body).to.be.a('object');
        expect(response.body).to.have.property('data');
        expect(response.body.message).to.be.a('string');
        expect(response.body).to.have.property(
          'message',
          'User account created successfully',
        );
        userId = response.body.data._id;
        done(error);
      });
  });
  it('users should not be able to create an account without wrong body', (done) => {
    router()
      .post('/api/v1/user/register')
      .send(account[0])
      .end((error, response) => {
        expect(response).to.have.status([400]);
        expect(response.body).to.be.a('object');
        expect(response.body).to.have.property('status');
        expect(response.body).to.have.property('message');
        done(error);
      });
  });
  it('users should not be able to create an account without existing email', (done) => {
    router()
      .post('/api/v1/user/register')
      .send(account[1])
      .end((error, response) => {
        expect(response).to.have.status([409]);
        expect(response.body).to.be.a('object');
        expect(response.body).to.have.property('status');
        expect(response.body).to.have.property('message');
        done(error);
      });
  });
  it('users should not be able to update their profile when Id is wrong', (done) => {
    router()
      .patch(`/api/v1/edit-profile/1`)
      .send((account[1], ['role']))
      .end((error, response) => {
        expect(response).to.have.status([400]);
        expect(response.body).to.be.a('object');
        expect(response.body).to.have.property('status');
        expect(response.body).to.have.property('message');
        done(error);
      });
  });
  it('users should not be able to update their profile when body is wrong', (done) => {
    router()
      .patch(`/api/v1/edit-profile/${userId}`)
      .send(omit(account[0], ['role']))
      .end((error, response) => {
        expect(response).to.have.status([400]);
        expect(response.body).to.be.a('object');
        expect(response.body).to.have.property('status');
        expect(response.body).to.have.property('message');
        done(error);
      });
  });
  it('users should be able to update their profile', (done) => {
    router()
      .patch(`/api/v1/edit-profile/${userId}`)
      .send(omit(account[1], ['role']))
      .end((error, response) => {
        expect(response).to.have.status([200]);
        expect(response.body).to.be.a('object');
        expect(response.body).to.have.property('status');
        expect(response.body).to.have.property('message');
        done(error);
      });
  });
});

describe('Updating password', async () => {
  it('user should be able to update the password', async () => {
    router()
      .patch('/api/v1/user/securePassword')
      .send({ email: account[1].email, password: 'Amen123!' })
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.a('object');
        expect(response.body).to.have.property('data');
        expect(response.body.message).to.be.a('string');
        expect(response.body).to.have.property(
          'message',
          'Successful updated your password',
        );
      });
  });
  it('should return user not found when the user is not registerd in the system', (done) => {
    router()
      .patch('/api/v1/user/securePassword')
      .send({ email: 'user38@gmail.com', password: 'Amen123!' })
      .end((error, response) => {
        if (error) done(error);
        expect(response).to.have.status(404);
        expect(response.body).to.be.a('object');
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.be.a('string');
        expect(response.body).to.have.property(
          'message',
          'User not found',
        );
        done();
      });
  });
});
