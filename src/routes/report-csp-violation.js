import https from 'https';
import querystring from 'querystring';

const options = {
  hostname: 'api.telegram.org',
  port: 443,
  path: `/bot${'process.env.BOT_API_TOKEN'}/sendMessage`,
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
};


export async function post(req, res, next) {
  const postData = querystring.stringify({
      'chat_id' : 'process.env.BOT_REPORT_CHAT_ID',
      'text': '```\n' + JSON.stringify(req.body, null, 2) + '\n```',
      'parse_mode': 'MarkdownV2',
  });
  options.headers['Content-Length'] = postData.length;
  const rep = https.request(options);
  rep.write(postData);
  rep.end();
  console.log(req.body);
	res.status(204).send();
}
