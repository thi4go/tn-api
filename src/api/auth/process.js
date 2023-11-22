import { pipeAsync } from '../../fp.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { TN_COOKIE } from '../../constants.js';
import { JWT_SECRET } from '../../config.js';

export async function processLogoutGET(db, req) {
  const token = req.cookies[TN_COOKIE];
}

export async function processLoginPOST(db, req) {
  const { username, password } = req.body;
  const pipeContext = { db, username, password };
  return await pipeLogin(pipeContext);
}

const pipeLogin = pipeAsync(
  getUserByUsername,
  compareHashedPasswords,
  createSessionToken,
);

async function getUserByUsername(context) {
  const { username, db } = context;
  const user = await db.models.User.findOne({ where: { username: username } });
  if (!user) {
    console.log('here');
    throw new Error('Invalid credentials');
  }
  return { ...context, user };
}

async function compareHashedPasswords(context) {
  const { password, user } = context;
  if (!(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid credentials');
  }
  return context;
}

async function createSessionToken(context) {
  const { user } = context;
  const token = jwt.sign(
    { username: user.username, userId: user.id, userBalance: user.balance },
    JWT_SECRET,
    {
      expiresIn: '1h',
    },
  );
  const oneHourInMilli = 60 * 60 * 1000;
  const expiresIn = new Date(Date.now() + oneHourInMilli);
  return {
    ...context,
    token,
    expiresIn,
  };
}
