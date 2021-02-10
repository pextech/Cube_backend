import BcryptUtil from '../../utils/Bcrypt.util';

const data = {
  users: [
    {
      fullname: 'Tonton',
      email: 'admin@sample.com',
      password: BcryptUtil.hashPassword(process.env.PASSWORD),
      role: 'Manager',
    },
    {
      fullname: 'Maombi',
      email: 'maombi@test.com',
      password: BcryptUtil.hashPassword(process.env.PASSWORD),
      role: 'Client',
    },
    {
      fullname: 'Gatete',
      email: 'gatete@test.com',
      password: BcryptUtil.hashPassword(process.env.PASSWORD),
      role: 'Manager',
    },
  ],
};

export default data;
