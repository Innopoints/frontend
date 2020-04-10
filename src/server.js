import sirv from 'sirv';
import app from 'express';
import helmet from 'helmet';
import { v4 as uuidv4 } from 'uuid';
import compression from 'compression';
import * as sapper from '@sapper/server';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';


app()
  .use(
    (req, res, next) => {
      res.locals.nonce = uuidv4();
      next();
    },
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: [
            "'self'",
            (req, res) => `'nonce-${res.locals.nonce}'`,
            "'unsafe-eval'",
            "'unsafe-inline'",
          ],
          styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
          fontSrc: ["'self'", 'data:', 'https://fonts.gstatic.com'],
          imgSrc: ["'self'", 'blob:'],
          objectSrc: ["'none'"],
          baseUri: ["'self'"],
          frameAncestors: ["'none'"],
          connectSrc: (dev ? ['*'] : ["'self'", 'https://fonts.googleapis.com']),
          reportUri: '/report-csp-violation',
        },
        reportOnly: true,  // This is for testing in a production environment, to be removed
      },
      frameguard: {
        action: 'deny',
      },
      permittedCrossDomainPolicies: true,
      referrerPolicy: {
        policy: 'same-origin',
      },
    }),
    app.json({ type: 'application/csp-report' }),
    compression({ threshold: 0 }),
    sirv('static', { dev }),
    sapper.middleware({
      session: (req, res) => ({
        cookies: req.headers.cookie,
      }),
    }),
  )
  .listen(PORT, err => {
    if (err) console.log('error', err);
  });
