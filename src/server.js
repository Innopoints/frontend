import sirv from 'sirv';
import app from 'express';
import helmet from 'helmet';
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
          headers: { Cookie: req.headers.cookie },
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
    helmet({
      frameguard: {
        action: 'deny',
      },
      referrerPolicy: {
        policy: 'same-origin',
      },
      contentSecurityPolicy: false,
    }),
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
