// In getUserBalance.test.js
const { getUserBalance } = require('path_to_your_module');
const mockDb = {
  models: {
    User: {
      findByPk: jest.fn().mockResolvedValue({ balance: 100 }),
    },
  },
};

describe('getUserBalance', () => {
  it('should return user balance', async () => {
    const context = { db: mockDb, userId: 'user123' };
    const result = await getUserBalance(context);
    expect(result).toEqual({ ...context, balance: 100 });
  });

  // Add more tests for cases like user not found, etc.
});
