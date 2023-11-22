import express from 'express';
import { initDatabase } from './db/db.js';
import { registerUsersAPI } from './api/users/handler.js';
import { registerOperationsAPI } from './api/operations/handler.js';
import { pipeAsync, tryCatchAsync } from './fp.js';
import { registerMiddlewares } from './middlewares.js';
import { registerAuthAPI } from './api/auth/handler.js';
import { PORT } from './config.js';
import { registerRecordsAPI } from './api/records/handler.js';

const initExpressApp = (db) => {
  const app = express();
  return { app, db };
};

const startServer = ({ app }) => {
  return app.listen(PORT, () => {
    console.log(`TrueNorth API running on port :${PORT}!`);
  });
};

const trueNorthAPI = pipeAsync(
  initDatabase,
  initExpressApp,
  registerMiddlewares,
  registerUsersAPI,
  registerOperationsAPI,
  registerRecordsAPI,
  registerAuthAPI,
  startServer,
);

const run = await tryCatchAsync(trueNorthAPI)();

run.fold(
  (error) => {
    console.error('Server failed to start', error);
  },
  () => {
    console.log('Server started successfully');
  },
);
