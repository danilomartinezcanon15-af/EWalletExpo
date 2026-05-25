import { fakerES_MX as faker } from '@faker-js/faker';

const transactionTypes = ['Ingreso', 'Retiro'];

const transactionStatus = [
  'Completado',
  'Pendiente',
  'Rechazado',
];

export function generateTransactionHistory(count) {

  return Array.from({ length: count }, () => ({

    id: faker.string.uuid(),

    accountNumber: faker.finance.accountNumber(10),

    type: faker.helpers.arrayElement(transactionTypes),

    amount: Number(
      faker.finance.amount({
        min: 10000,
        max: 500000,
        dec: 0,
      })
    ),

    date: faker.date.recent({
      days: 30,
    }),

    status: faker.helpers.arrayElement(transactionStatus),

  }));

}