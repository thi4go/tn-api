import { USER_INITIAL_BALANCE, USER_STATUS_ACTIVE } from '../../constants.js';
import { hashUserPassword } from '../../db/models/users.js';

export async function processUsersGET(db) {
  const users = await db.models.User.findAll();
  return users.map((user) => ({
    id: user.id,
    username: user.username,
    status: user.status,
    balance: user.balance,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  }));
}

export async function processUsersPOST(db, req) {
  const { username, password } = req.body;
  const hashedPassword = await hashUserPassword(password);
  return await db.models.User.create({
    username: username,
    password: hashedPassword,
    status: USER_STATUS_ACTIVE,
    balance: USER_INITIAL_BALANCE,
  });
}
