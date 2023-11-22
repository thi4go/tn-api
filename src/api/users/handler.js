import { withDatabase, withErrorHandling } from '../../fp.js';
import { processUsersGET, processUsersPOST } from './process.js';
import { validateUsersPOST } from './validate.js';

async function handleUsersGET(db, _, res) {
  return await processUsersGET(db);
}

async function handleUsersPOST(db, req, res) {
  validateUsersPOST(req);
  return { message: 'success', data: await processUsersPOST(db, req) };
}

export function registerUsersAPI({ app, db }) {
  app.get('/users', withErrorHandling(withDatabase(db, handleUsersGET)));
  app.post('/users', withErrorHandling(withDatabase(db, handleUsersPOST)));
  return { app, db };
}
