import chai from 'chai';
import chaihttp from 'chai-http';
import server from '../../server';
import { mockLoginUser } from '../../utils/fixtures/user.fixture';

chai.should();
chai.use(chaihttp);

describe('api/v1/user/login', () => {
  it('should return valid token when email & password are valid', (done) => {
    chai
      .request(server)
      .post('/api/v1/user/login/')
      .send(mockLoginUser)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('message');
        res.body.should.have.property('data');
      });
    done();
  });
});
