import { withDatabase, withErrorHandling } from '../../fp.js';
import { authMiddleware } from '../../middlewares.js';
import { processRecordsGET } from './process.js';

async function handleRecordsGET(db, req) {
  return { message: 'success', data: await processRecordsGET(db, req) };
}

export function registerRecordsAPI({ app, db }) {
  app.get(
    '/records',
    authMiddleware,
    withErrorHandling(withDatabase(db, handleRecordsGET)),
  );

  return { app, db };
}
