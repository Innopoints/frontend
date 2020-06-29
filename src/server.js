import sirv from 'sirv';
import app from 'express';
import helmet from 'helmet';
import { v4 as uuidv4 } from 'uuid';
import compression from 'compression';
import * as sapper from '@sapper/server';
import fetch from 'node-fetch';

const { PORT, NODE_ENV, SAPPER_APP_API_HOST } = process.env;
const dev = NODE_ENV === 'development';


/* If the request asks for a full page, retrieve the account data. */
async function populateSession(req, _res, next) {
  if (!/^(\/client\/|\/service-worker.js)/.test(req.url) && req.headers.cookie) {
    try {
      const accountResp = await fetch(
        `${SAPPER_APP_API_HOST}/account`,
        {
          headers: { 'Cookie': req.headers.cookie },
        },
      );
      if (accountResp.ok) {
        req._accountObject = await accountResp.json();
      }
    } catch (e) {
      console.error(e);
    }
  }
  next();
}


app()
  .use(
    (_req, res, next) => {
      res.locals.nonce = uuidv4();
      next();
    },
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: [
            "'self'",
            (_req, res) => `'nonce-${res.locals.nonce}'`,
            "'unsafe-eval'",
            "'unsafe-inline'",
          ],
          styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
          fontSrc: ["'self'", 'data:', 'https://fonts.gstatic.com'],
          imgSrc: ["'self'", 'blob:'],
          objectSrc: ["'none'"],
          baseUri: ["'self'"],
          frameAncestors: ["'none'"],
          connectSrc: (dev ? ['*'] : [
            "'self'", 'https://fonts.googleapis.com', 'fonts.gstatic.com',
          ]),
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
    populateSession,
    sapper.middleware({
      session: (req, _res) => ({
        account: req._accountObject,
        cookies: req.headers.cookie,
      }),
    }),
  )
  .listen(PORT, err => {
    if (err) {
      console.error('error', err);
    }
  });
