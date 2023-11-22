import { TN_COOKIE } from '../../constants.js';
import { withDatabase, withErrorHandling } from '../../fp.js';
import { authMiddleware } from '../../middlewares.js';
import { processLoginPOST } from './process.js';
import { validateLoginPOST } from './validate.js';

async function handleLoginPOST(db, req, res) {
  validateLoginPOST(req);
  const { token } = await processLoginPOST(db, req);

  const oneHour = 3600000;
  res.cookie(TN_COOKIE, token, {
    httpOnly: true,
    secure: false,
    maxAge: oneHour,
  });

  return { message: 'Logged in successfully' };
}

function handleLogoutGET(_, res) {
  res.cookie(TN_COOKIE, '', {
    httpOnly: true,
    expires: new Date(0),
  });

  return { message: 'Logged out successfully' };
}

async function handleSession(db, req) {
  const data = await db.models.User.findByPk(req.userId);
  return {
    message: 'Valid user session',
    userId: req.userId,
    username: req.username,
    userBalance: data.dataValues.balance,
  };
}

export function registerAuthAPI({ app, db }) {
  app.post('/auth/login', withErrorHandling(withDatabase(db, handleLoginPOST)));
  app.get('/auth/logout', withErrorHandling(handleLogoutGET));
  app.get(
    '/auth/session',
    authMiddleware,
    withErrorHandling(withDatabase(db, handleSession)),
  );
  return { app, db };
}
