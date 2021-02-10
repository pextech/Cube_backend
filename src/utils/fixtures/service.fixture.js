import faker from 'faker';

// eslint-disable-next-line import/prefer-default-export
export const service = {
  name: 'Hosting',
  price: faker.finance.amount(),
  billingCycle: 'Monthly',
  descriptions: faker.lorem.paragraph(),
};
