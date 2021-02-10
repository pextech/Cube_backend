import faker from 'faker';
import id from 'mongoose';
import User from '../../database/model/user.model';
import BcryptUtil from '../Bcrypt.util';
import TokenUtil from '../jwt.util';

const objectId = id.Types.ObjectId();

const password = faker.internet.password();
const newUser = {
  _id: objectId,
  fullname: faker.name.findName(),
  email: faker.internet.email(),
  password: BcryptUtil.hashPassword(password),
  role: 'Manager',
};

const notManager = {
  _id: '5fff2a57ab5f62aef78fe0b7',
  fullname: faker.name.findName(),
  email: faker.internet.email(),
  password: BcryptUtil.hashPassword(password),
  role: 'Client',
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
