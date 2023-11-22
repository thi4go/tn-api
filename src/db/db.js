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

function setupInitialConnection() {
  return new Sequelize('', DATABASE_USER, DATABASE_PASSWORD, {
    host: DATABASE_HOST,
    port: 3306,
    dialect: 'mysql',
    logging: false,
  });
}

async function setupDatabaseConnection(sequelize) {
  await sequelize.query(`CREATE DATABASE IF NOT EXISTS ${DATABASE_NAME};`);
  await sequelize.close();

  return new Sequelize(DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD, {
    host: DATABASE_HOST,
    port: 3306,
    dialect: 'mysql',
    logging: false,
  });
}

export async function initDatabase() {
  return await pipeAsync(
    setupInitialConnection,
    setupDatabaseConnection,
    defineUserModel,
    defineOperationModel,
    defineRecordModel,
    defineModelRelations,
    syncModels,
  )();
}
