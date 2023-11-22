import { withDatabase, withErrorHandling } from '../../fp.js';
import { authMiddleware } from '../../middlewares.js';
import { processOperationsPOST } from './process.js';
import { validateOperationsPOST } from './validate.js';

async function handleOperationsPOST(db, req) {
  validateOperationsPOST(req);
  return { message: 'success', data: await processOperationsPOST(db, req) };
}

export function registerOperationsAPI({ app, db }) {
  app.post(
    '/operations',
    authMiddleware,
    withErrorHandling(withDatabase(db, handleOperationsPOST)),
  );

  return { app, db };
}
