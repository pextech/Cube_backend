import chai from 'chai';
import chaiHttp from 'chai-http';
import {
  BAD_REQUEST,
  CONFLICT,
  CREATED,
  FORBIDDEN,
  UNAUTHORIZED,
} from 'http-status';
import app from '../../app';
import { service } from '../../utils/fixtures/service.fixture';
import {
  expiredToken,
  loggedInToken,
  notManagerToken,
} from '../../utils/fixtures/user.fixture';

chai.should();
chai.use(chaiHttp);

describe('/POST manager creates a service', () => {
  it('Should create a service', (done) => {
    chai
      .request(app)
      .post('/api/v1/services')
      .set('Authorization', `Bearer ${loggedInToken}`)
      .send(service)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.should.have.property('status');
        res.status.should.equal(CREATED);
        res.body.should.have.property('message');
        res.body.message.should.equal(
          'Service has been created successfully',
        );
        res.body.should.have.property('data');
        res.body.data.should.be.an('object');
        res.body.data.should.have.property('_id');
        res.body.data.should.have.property('userId');
        res.body.data.should.have.property('name');
        res.body.data.should.have.property('price');
        res.body.data.should.have.property('billingCycle');
        res.body.data.should.have.property('descriptions');
        res.body.data.should.have.property('createdAt');
        res.body.data.should.have.property('updatedAt');
        done();
      });
  });

  it('Should check if authorization has been set', (done) => {
    chai
      .request(app)
      .post('/api/v1/services')
      .send(service)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.should.have.property('status');
        res.status.should.equal(FORBIDDEN);
        res.body.should.have.property('message');
        res.body.message.should.equal(
          'You can not proceed without setting authorization token',
        );
        done();
      });
  });

  it('Should check if a token is valid', (done) => {
    chai
      .request(app)
      .post('/api/v1/services')
      .set('Authorization', 'Bearer')
      .send(service)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.should.have.property('status');
        res.status.should.equal(UNAUTHORIZED);
        res.body.should.have.property('message');
        res.body.message.should.equal('Unauthorized, invalid token');
        done();
      });
  });

  it('Should check if a token has been expired', (done) => {
    chai
      .request(app)
      .post('/api/v1/services')
      .set('Authorization', `Bearer ${expiredToken}`)
      .send(service)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.should.have.property('status');
        res.status.should.equal(UNAUTHORIZED);
        res.body.should.have.property('message');
        done();
      });
  });

  it('Should validate input fields', (done) => {
    chai
      .request(app)
      .post('/api/v1/services')
      .set('Authorization', `Bearer ${loggedInToken}`)
      .send('')
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.should.have.property('status');
        res.status.should.equal(BAD_REQUEST);
        res.body.should.have.property('message');
        res.body.message.should.be.an('array');
        done();
      });
  });

  it('Should check if a user is a manager', (done) => {
    chai
      .request(app)
      .post('/api/v1/services')
      .set('Authorization', `Bearer ${notManagerToken}`)
      .send(service)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.should.have.property('status');
        res.status.should.equal(UNAUTHORIZED);
        res.body.should.have.property('message');
        res.body.message.should.be.equal(
          'Only a manager can create a service',
        );
        done();
      });
  });

  it('Should check if a service has been created before', (done) => {
    chai
      .request(app)
      .post('/api/v1/services')
      .set('Authorization', `Bearer ${loggedInToken}`)
      .send(service)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.should.have.property('status');
        res.status.should.equal(CONFLICT);
        res.body.should.have.property('message');
        done();
      });
  });
});
