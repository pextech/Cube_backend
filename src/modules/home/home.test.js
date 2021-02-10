import chai from 'chai';
import chaihttp from 'chai-http';
import server from '../../server';

chai.should();

chai.use(chaihttp);

describe('/home', () => {
  it('should return a a message', (done) => {
    chai
      .request(server)
      .get('/api/v1/home')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.eql({
          status: 200,
          message: 'Up and Running',
        });
        done();
      });
  });
});
