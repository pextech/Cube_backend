import chai from 'chai';
import chaiHttp from 'chai-http';
import { BAD_REQUEST, CONFLICT, NOT_FOUND, OK } from 'http-status';
import server from '../../server';
import {
  updatedUserData,
  invalidUserData,
} from '../../utils/fixtures/user.fixture';

chai.should();
chai.use(chaiHttp);

describe('/PATCH secure password', () => {
  it('Should update a secure a password', (done) => {
    chai
      .request(server)
      .patch('/api/v1/auth/secure-password')
      .send(updatedUserData)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.should.have.property('status');
        res.body.status.should.equal(OK);
        res.body.should.have.property('message');
        res.body.message.should.equal(
          'Successful updated your password',
        );
        res.body.should.have.property('data');
        res.body.data.should.be.an('object');
        res.body.data.should.have.property('_id');
        res.body.data.should.have.property('role');
        res.body.data.should.have.property('linkedin');
        res.body.data.should.have.property('twitter');
        res.body.data.should.have.property('instagram');
        res.body.data.should.have.property('facebook');
        res.body.data.should.have.property('fullName');
        res.body.data.should.have.property('email');
        res.body.data.should.have.property('phoneNumber');
        res.body.data.should.have.property('companyName');
        res.body.data.should.have.property('address');
        res.body.data.should.have.property('createdAt');
        res.body.data.should.have.property('updatedAt');
      });
    done();
  });

  it('Should validate input fields', (done) => {
    chai
      .request(server)
      .patch('/api/v1/auth/secure-password')
      .send()
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.should.have.property('status');
        res.body.status.should.equal(BAD_REQUEST);
        res.body.should.have.property('message');
        res.body.message.should.be.an('array');
      });
    done();
  });

  it('Should check if user exists', (done) => {
    chai
      .request(server)
      .patch('/api/v1/auth/secure-password')
      .send(invalidUserData)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.should.have.property('status');
        res.body.status.should.equal(NOT_FOUND);
        res.body.should.have.property('message');
        res.body.message.should.equal('User not found');
      });
    done();
  });

  it('Should check password has been updated', (done) => {
    chai
      .request(server)
      .patch('/api/v1/auth/secure-password')
      .send(updatedUserData)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.should.have.property('status');
        res.body.status.should.equal(CONFLICT);
        res.body.should.have.property('message');
        res.body.message.should.equal(
          'Error, Account is already secured with a password',
        );
      });
    done();
  });
});
