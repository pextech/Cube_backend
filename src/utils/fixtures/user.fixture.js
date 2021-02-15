import faker from 'faker';
import id from 'mongoose';
import User from '../../database/model/user.model';
import BcryptUtil from '../Bcrypt.util';
import TokenUtil from '../jwt.util';

const objectId = id.Types.ObjectId();

export const user = {
  fullName: faker.name.findName(),
  email: faker.internet.email(),
  phoneNumber: '+250788445847',
  companyName: faker.company.companyName(),
  address: faker.address.city(),
};

const password = faker.internet.password();
const newUser = {
  _id: objectId,
  fullName: faker.name.findName(),
  email: faker.internet.email(),
  password: BcryptUtil.hashPassword(password),
  phoneNumber: '+250788445847',
  role: 'Manager',
  companyName: faker.company.companyName(),
  address: faker.address.city(),
};

const notManager = {
  _id: '5fff2a57ab5f62aef78fe0b7',
  fullName: faker.name.findName(),
  email: faker.internet.email(),
  password: BcryptUtil.hashPassword(password),
  phoneNumber: '+250788445847',
  role: 'Client',
  companyName: faker.company.companyName(),
  address: faker.address.city(),
};

export const invalidCredentials = {
  email: faker.internet.email(),
  password: faker.internet.password(),
};

export const updatedUserData = {
  email: user.email,
  password: 'Pass1234?',
};

export const invalidUserData = {
  email: faker.internet.email(),
  password: 'Pass1234?',
};

export const loggedInToken = TokenUtil.generateToken(newUser);
export const notManagerToken = TokenUtil.generateToken(notManager);
export const expiredToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDAxYzUyNGI0ZWY4ODc5ZDY3YjNkOTYiLCJmdWxsbmFtZSI6Ik1zLiBPdGlzIExlZmZsZXIiLCJlbWFpbCI6IkpvZGllOTFAaG90bWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRRLzFKamZqazJveTRJRUFYcFRHVlZPSUlBV1B6Zk1EbEpnRExva2ZsSFB5WWt5VFhEaDBxNiIsInJvbGUiOiJNYW5hZ2VyIiwiaWF0IjoxNjEwNzI4NzQwLCJleHAiOjE2MTA3Mjg4MDB9.iko4qCpqaitg5-O1fWnxurTPCa8-t1iXUg8kG-Eno2c';

export const mockLoginUser = {
  email: newUser.email,
  password,
};

export const createUser = async () => {
  await User.create(newUser);
  await User.create(notManager);
};
