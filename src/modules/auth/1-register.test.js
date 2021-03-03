import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server';
import cleanAllTables from '../../utils/fixtures/database.fixture';
import { createUser, user } from '../../utils/fixtures/user.fixture';

chai.should();
chai.use(chaiHttp);

describe('/POST register', () => {
  before(async () => {
    await cleanAllTables();
    await createUser();
  });
  it('Should register a user', (done) => {
    chai
      .request(server)
      .post('/api/v1/auth/register')
      .send(user)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.should.have.property('status');
        res.body.status.should.equal(201);
        res.body.should.have.property('message');
        res.body.message.should.equal(
          'User account created successfully',
        );
        res.body.should.have.property('data');
        res.body.data.should.have.property('_id');
        res.body.data.should.have.property('fullName');
        res.body.data.should.have.property('email');
        res.body.data.should.have.property('password');
        res.body.data.should.have.property('phoneNumber');
        res.body.data.should.have.property('role');
        res.body.data.should.have.property('companyName');
        res.body.data.should.have.property('address');
        res.body.data.should.have.property('linkedin');
        res.body.data.should.have.property('twitter');
        res.body.data.should.have.property('instagram');
        res.body.data.should.have.property('facebook');
        res.body.data.should.have.property('createdAt');
        res.body.data.should.have.property('updatedAt');
      });
    done();
  });

  it('Should validate input fields', (done) => {
    chai
      .request(server)
      .post('/api/v1/auth/register')
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.should.have.property('status');
        res.body.status.should.equal(400);
        res.body.should.have.property('message');
      });
    done();
  });

  it('Should check if email already exists', (done) => {
    chai
      .request(server)
      .post('/api/v1/auth/register')
      .send(user)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.should.have.property('status');
        res.body.status.should.equal(409);
        res.body.should.have.property('message');
        res.body.message.should.equal(
          'User with this email already exist',
        );
      });
    done();
  });
});
