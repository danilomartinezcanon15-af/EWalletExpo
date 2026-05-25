import {
  generateTransactionHistory,
  calculateNetBalance,
  calculateCashback,
  calculateTotalCashback,
  buyUSDT,
  createSavingsGoals,
  transferToSavingsGoal,
  classifyExpenses,
} from '../walletEngine';

describe('Wallet Engine Tests', () => {

  test('Debe generar exactamente 50 transacciones', () => {

    const transactions = generateTransactionHistory(50);

    expect(transactions).toHaveLength(50);

  });

  test('El monto siempre debe ser positivo y mayor que cero', () => {

    const transactions = generateTransactionHistory(100);

    transactions.forEach(transaction => {
      expect(transaction.amount).toBeGreaterThan(0);
    });

  });

  test('No deben existir campos undefined', () => {

    const transactions = generateTransactionHistory(20);

    transactions.forEach(transaction => {

      Object.values(transaction).forEach(value => {
        expect(value).not.toBeUndefined();
      });

    });

  });

  test('Debe calcular correctamente el saldo neto total', () => {

    const mockTransactions = [

      {
        type: 'Ingreso',
        amount: 100000,
        status: 'Completado',
      },

      {
        type: 'Ingreso',
        amount: 50000,
        status: 'Completado',
      },

      {
        type: 'Retiro',
        amount: 30000,
        status: 'Completado',
      },

      {
        type: 'Retiro',
        amount: 20000,
        status: 'Pendiente',
      },

    ];

    const result = calculateNetBalance(mockTransactions);

    expect(result).toBe(120000);

  });