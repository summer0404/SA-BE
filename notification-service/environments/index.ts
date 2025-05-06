import * as dotenv from 'dotenv';

dotenv.config();

export const PROJECT_NAME = process.env.PROJECT_NAME;
export const DB_USER = process.env.DB_USER;
export const DB_PASS = process.env.DB_PASS;
export const DB_NAME_DEVELOPMENT = process.env.DB_NAME_DEVELOPMENT;
export const DB_NAME_TEST = process.env.DB_NAME_TEST;
export const DB_NAME_PRODUCTION = process.env.DB_NAME_PRODUCTION;
export const DB_HOST = process.env.DB_HOST;
export const DB_PORT = process.env.DB_PORT;
export const DB_DIALECT = process.env.DB_DIALECT;
export const DB_SSL = process.env.DB_SSL;
export const NODE_ENV = process.env.NODE_ENV;