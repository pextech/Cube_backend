import chai from 'chai';
import chaihttp from 'chai-http';
import server from '../../server';
import {
  invalidCredentials,
  mockLoginUser,
} from '../../utils/fixtures/user.fixture';

chai.should();
chai.use(chaihttp);

describe('/POST login', () => {
  it('should return valid token when email & password are valid', (done) => {
    chai
      .request(server)
      .post('/api/v1/auth/login/')
      .send(mockLoginUser)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.should.have.property('status');
        res.body.status.should.equal(200);
        res.body.should.have.property('message');
        res.body.message.should.equal('Successfully logged in');
        res.body.should.have.property('data');
        res.body.data.should.have.property('user');
        res.body.data.user.should.have.property('fullName');
        res.body.data.user.should.have.property('_id');
        res.body.data.user.should.have.property('email');
        res.body.data.user.should.have.property('phoneNumber');
        res.body.data.user.should.have.property('role');
        res.body.data.user.should.have.property('createdAt');
        res.body.data.user.should.have.property('updatedAt');
        res.body.data.should.have.property('token');
      });
    done();
  });

  it('Should validate input fields', (done) => {
    chai
      .request(server)
      .post('/api/v1/auth/login/')
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.should.have.property('status');
        res.body.status.should.equal(400);
        res.body.should.have.property('message');
      });
    done();
  });

  it('Should not login with invalid credentials', (done) => {
    chai
      .request(server)
      .post('/api/v1/auth/login/')
      .send(invalidCredentials)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.should.have.property('status');
        res.body.status.should.equal(401);
        res.body.should.have.property('message');
        res.body.message.should.equal('Invalid email or password');
      });
    done();
  });
});
