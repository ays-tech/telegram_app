// pages/api/auth.ts

import { validate, parse, type InitDataParsed } from '@telegram-apps/init-data-node';
import type { NextApiRequest } from 'next';
import type { ExtendedNextApiResponse } from '../../types/ExtendedNextApiResponse';

// Your secret bot token
const token = '7483595935:AAEJq_ZAUNMqMME0U7J1LyPo4hwM_CRNPqY';

/**
 * Sets init data in the specified Response object.
 * @param res - Response object.
 * @param initData - init data.
 */
function setInitData(res: ExtendedNextApiResponse, initData: InitDataParsed): void {
  res.locals = res.locals || {};
  res.locals.initData = initData;
}

/**
 * Extracts init data from the Response object.
 * @param res - Response object.
 * @returns Init data stored in the Response object. Can return undefined in case,
 * the client is not authorized.
 */
function getInitData(res: ExtendedNextApiResponse): InitDataParsed | undefined {
  return res.locals?.initData;
}

/**
 * Middleware which authorizes the external client.
 * @param req - Request object.
 * @param res - Response object.
 * @param next - function to call the next middleware.
 */
const authMiddleware = (req: NextApiRequest, res: ExtendedNextApiResponse, next: (error?: Error) => void) => {
  const [authType, authData = ''] = (req.headers.authorization || '').split(' ');

  switch (authType) {
    case 'tma':
      try {
        // Validate init data
        validate(authData, token, {
          // We consider init data sign valid for 1 hour from their creation moment
          expiresIn: 3600,
        });

        // Parse init data. We will surely need it in the future
        setInitData(res, parse(authData));
        return next();
      } catch (e) {
        return next(e);
      }
    // ... other authorization methods
    default:
      return next(new Error('Unauthorized'));
  }
};

/**
 * Handler which shows the user init data.
 * @param req
 * @param res - Response object.
 */
const showInitDataHandler = (req: NextApiRequest, res: ExtendedNextApiResponse) => {
  const initData = getInitData(res);
  if (!initData) {
    return res.status(401).json({ error: 'Cant display init data as long as it was not found' });
  }
  res.status(200).json(initData);
};

/**
 * Default error handler middleware for Next.js API routes.
 * @param err - handled error.
 * @param req
 * @param res - Response object.
 */
const defaultErrorMiddleware = (err: Error, req: NextApiRequest, res: ExtendedNextApiResponse) => {
  res.status(500).json({
    error: err.message,
  });
};

export default async (req: NextApiRequest, res: ExtendedNextApiResponse) => {
  const runMiddleware = (req: NextApiRequest, res: ExtendedNextApiResponse, fn: Function) =>
    new Promise((resolve, reject) => {
      fn(req, res, (result: any) => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(result);
      });
    });

  try {
    await runMiddleware(req, res, authMiddleware);

    if (req.method === 'POST') {
      return showInitDataHandler(req, res);
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (err) {
    return defaultErrorMiddleware(err, req, res);
  }
};