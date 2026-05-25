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

export function calculateNetBalance(transactions) {

  return transactions.reduce((balance, transaction) => {

    if (transaction.status !== 'Completado') {
      return balance;
    }

    if (transaction.type === 'Ingreso') {
      return balance + transaction.amount;
    }

    if (transaction.type === 'Retiro') {
      return balance - transaction.amount;
    }

    return balance;

  }, 0);

}

/* =========================
   CASHBACK SYSTEM
========================= */

export function calculateCashback(transaction) {

  if (
    transaction.amount > 50000 &&
    transaction.status === 'Completado'
  ) {
    return transaction.amount * 0.01;
  }

  return 0;

}

export function calculateTotalCashback(transactions) {

  return transactions.reduce((total, transaction) => {

    return total + calculateCashback(transaction);

  }, 0);

}

/* =========================
   USDT SYSTEM
========================= */

export function buyUSDT(balanceCOP, amountCOP) {

  const exchangeRate = faker.number.int({
    min: 3900,
    max: 4300,
  });

  if (amountCOP > balanceCOP) {

    return {
      status: 'Rechazado',
      message: 'Saldo insuficiente',
    };

  }

  return {
    status: 'Completado',
    exchangeRate,
    usdt: amountCOP / exchangeRate,
  };

}

/* =========================
   SAVINGS GOALS
========================= */

export function createSavingsGoals() {

  return Array.from({ length: 3 }, () => ({

    id: faker.string.uuid(),

    name: faker.finance.accountName(),

    saved: faker.number.int({
      min: 50000,
      max: 500000,
    }),

  }));

}

export function transferToSavingsGoal(
  balance,
  goals,
  goalId,
  amount
) {

  if (amount > balance) {

    return {
      status: 'Rechazado',
      message: 'Saldo insuficiente',
    };

  }

  const updatedGoals = goals.map(goal => {

    if (goal.id === goalId) {

      return {
        ...goal,
        saved: goal.saved + amount,
      };

    }

    return goal;

  });

  return {

    status: 'Completado',

    balance: balance - amount,

    goals: updatedGoals,

  };

}

/* =========================
   SAVINGS HISTORY  ← NUEVO
========================= */

/**
 * Crea una entrada de historial para una transferencia
 * a una meta de ahorro.
 *
 * @param {string} goalId   - ID de la meta destino
 * @param {string} goalName - Nombre de la meta destino
 * @param {number} amount   - Monto transferido
 * @returns {object} Entrada de historial
 */
export function createSavingsHistoryEntry(goalId, goalName, amount) {

  return {
    id: faker.string.uuid(),
    goalId,
    goalName,
    amount,
    date: new Date(),
    status: 'Completado',
  };

}

/**
 * Agrega una nueva entrada al historial existente.
 *
 * @param {Array}  history - Historial actual
 * @param {object} entry   - Entrada nueva generada por createSavingsHistoryEntry
 * @returns {Array} Nuevo historial con la entrada al inicio
 */
export function addSavingsHistoryEntry(history, entry) {

  return [entry, ...history];

}

/**
 * Filtra el historial por el ID de una meta específica.
 *
 * @param {Array}  history - Historial completo
 * @param {string} goalId  - ID de la meta a filtrar
 * @returns {Array} Entradas que corresponden a esa meta
 */
export function filterHistoryByGoal(history, goalId) {

  return history.filter(entry => entry.goalId === goalId);

}

/**
 * Calcula el total transferido a una meta específica
 * sumando todas sus entradas del historial.
 *
 * @param {Array}  history - Historial completo
 * @param {string} goalId  - ID de la meta
 * @returns {number} Suma total transferida
 */
export function getTotalTransferredToGoal(history, goalId) {

  return filterHistoryByGoal(history, goalId)
    .reduce((total, entry) => total + entry.amount, 0);

}

