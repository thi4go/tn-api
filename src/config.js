import { defaultTo } from 'ramda';

export const PORT = defaultTo(8080, process.env.PORT);

export const JWT_SECRET = defaultTo('temp_secret_key', process.env.JWT_SECRET);

export const DATABASE_NAME = defaultTo(
  'truenorth_dev',
  process.env.DATABASE_NAME,
);
export const DATABASE_USER = defaultTo('root', process.env.DATABASE_USER);
export const DATABASE_PASSWORD = defaultTo('', process.env.DATABASE_PASSWORD);
export const DATABASE_HOST = defaultTo('localhost', process.env.DATABASE_HOST);
