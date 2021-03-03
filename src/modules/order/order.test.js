// /* eslint-disable no-undef */
// import chaihttp from 'chai-http';
// import chai from 'chai';

// import server from '../../server';
// import {
//   expiredToken,
//   loggedInToken,
// } from '../../utils/fixtures/user.fixture';

// chai.use(chaihttp);
// chai.should();
// chai.expect();
// const router = () => chai.request(server);

// describe('/order', () => {
//   const order = {
//     name: 'service name',
//     serviceId: 'c940eed7-38dd-4789-843c-f4fe52c67067',
//     serviceName: 'best package',
//     package: 'new package',
//     price: 100,
//     status: 'pending',
//     paid: false,
//     delivered: false,
//     comment: 'no comment',
//   };
//   const invalidOrder = {
//     name: 'service name',
//     price: 100,
//     status: 'pending',
//     comment: 'no comment',
//   };
//   it('user should be able to order any package providing all the requirements', (done) => {
//     router()
//       .post('/api/v1/order')
//       .set('Authorization', `Bearer ${loggedInToken}`)
//       .send(order)
//       .end((error, res) => {
//         res.body.should.be.an('object');
//         res.status.should.be.eql(201);
//         res.body.should.have.property('message');
//         res.body.should.have.property('data');
//         res.body.data.should.have.property('serviceId');
//         res.body.data.should.have.property('serviceName');
//         res.body.data.should.have.property('package');
//         res.body.data.should.have.property('price');
//         res.body.data.should.have.property('status');
//         res.body.data.should.have.property('paid');
//         res.body.data.should.have.property('delivered');
//         done(error);
//       });
//   });

//   it('unauthenticated user should not be able to order any package', (done) => {
//     router()
//       .post('/api/v1/order')
//       .set('Authorization', `Bearer ${expiredToken}`)
//       .send(order)
//       .end((error, res) => {
//         res.body.should.be.an('object');
//         res.status.should.be.eql(401);
//         res.body.should.have.property('message');
//         done(error);
//       });
//   });

//   it('user should not be able to order any package without providing required info', (done) => {
//     router()
//       .post('/api/v1/order')
//       .set('Authorization', `Bearer ${loggedInToken}`)
//       .send(invalidOrder)
//       .end((error, res) => {
//         res.body.should.be.an('object');
//         res.status.should.be.eql(400);
//         res.body.should.have.property('error');
//         done(error);
//       });
//   });
// });
