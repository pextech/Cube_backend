import chaihttp from 'chai-http';
import chai, { expect } from 'chai';
import server from '../../server';
import dummyData from './invoice.dummy';
import Invoice from '../../database/model/invoice.model';

chai.use(chaihttp);
const router = () => chai.request(server);

describe('/invoice', async () => {
  before(async () => {
    await Invoice.deleteMany({});
  });
  it('users should be able to generate an invoice with correct body', (done) => {
    router()
      .post('/api/v1/invoice')
      .send(dummyData[1])
      .end((error, response) => {
        expect(response).to.have.status([201]);
        expect(response.body).to.be.a('object');
        expect(response.body).to.have.property('data');
        expect(response.body.message).to.be.a('string');
        expect(response.body).to.have.property(
          'message',
          'Invoice generated successfully, check your email',
        );
        done(error);
      });
  });
  it('users should not be able to generate an invoice with wrong body', (done) => {
    router()
      .post('/api/v1/invoice')
      .send(dummyData[0])
      .end((error, response) => {
        expect(response).to.have.status([400]);
        expect(response.body).to.be.a('object');
        expect(response.body).to.have.property('status');
        expect(response.body).to.have.property('message');
        done(error);
      });
  });
});
