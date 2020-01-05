import request from '@/utils/request';
import fetch from 'node-fetch';

export async function get(req, res, next) {
  const result = await request(fetch, '/products?limit=24');
  if (result) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result));
  } else {
    next();
  }
}
