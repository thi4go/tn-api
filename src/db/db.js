import { Sequelize } from 'sequelize';
import { pipeAsync } from '../fp.js';
import { defineUserModel } from './models/users.js';
import { defineOperationModel } from './models/operations.js';
import { defineRecordModel } from './models/records.js';
import { defineModelRelations, syncModels } from './models/lib.js';
import {
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_PASSWORD,
  DATABASE_USER,
} from '../config.js';

async function createDatabaseIfNotExists() {
  const sequelize = new Sequelize('', DATABASE_USER, DATABASE_PASSWORD, {
    host: DATABASE_HOST,
    port: 3306,
    dialect: 'mysql',
    logging: false,
    retry: {
      max: 10,
      match: ['ECONNREFUSED', /ECONNREFUSED/],
      backoffBase: 3000,
    },
  });

  await sequelize.query(`CREATE DATABASE IF NOT EXISTS ${DATABASE_NAME};`);
  await sequelize.close();
}

async function setupDatabaseConnection() {
  return new Sequelize(DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD, {
    host: DATABASE_HOST,
    port: 3306,
    dialect: 'mysql',
    logging: false,
    retry: {
      max: 10,
      match: ['ECONNREFUSED', /ECONNREFUSED/],
      backoffBase: 3000,
    },
  });
}

export async function initDatabase() {
  return await pipeAsync(
    createDatabaseIfNotExists,
    setupDatabaseConnection,
    defineUserModel,
    defineOperationModel,
    defineRecordModel,
    defineModelRelations,
    syncModels,
  )();
}
