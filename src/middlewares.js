import express from 'express';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import cors from 'cors';

import { tryCatch } from './fp.js';
import { TN_COOKIE } from './constants.js';
import { JWT_SECRET } from './config.js';

export const registerMiddlewares = ({ app, db }) => {
  app.use(express.json());
  app.use(cookieParser());
  app.use(
    cors({
      origin: 'http://localhost:3001',
      credentials: true,
    }),
  );
  return { app, db };
};

export function authMiddleware(req, res, next) {
  tryCatch(() => {
    const token = req.cookies[TN_COOKIE];
    if (!token) {
      throw new Error('No authentication token');
    }
    const userData = jwt.verify(token, JWT_SECRET);
    req.userId = userData.userId;
    req.username = userData.username;
  }).fold(
    (err) => {
      return res.status(401).json({ error: 'Invalid authentication token' });
    },
    () => next(),
  );
}
