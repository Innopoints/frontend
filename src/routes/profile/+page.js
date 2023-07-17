import getInitialData from 'src/utils/get-initial-data.js';
import isoForURL from 'src/utils/iso-for-url.js';

const monthGap = 3;  // The amount of months to preload the timeline for

export async function load(page, session) {
  let requestedEmail = page.query.user;

  if (session.account == null) {
    this.error(403, 'Profile');
    return;  // you may think we don't need this, but strangely, we do
  }

  const isMe = requestedEmail === session.account.email;
  const allowed = requestedEmail == null || isMe || session.account.is_admin;

  // non-admin requested a different profile
  if (!allowed) {
    this.redirect(302, `/profile`);
  }

  if (requestedEmail == null) {
    requestedEmail = session.account.email;
  }

  const timelineFetchedUntil = new Date();
  timelineFetchedUntil.setMonth(timelineFetchedUntil.getMonth() - monthGap);
  const data = await getInitialData(this, session, new Map([
    ['account', `/accounts/${requestedEmail}`],
    [
      'timeline',
      `/accounts/${requestedEmail}/timeline?start_date=${isoForURL(timelineFetchedUntil)}`,
    ],
    [
      'statistics',
      `/accounts/${requestedEmail}/statistics?start_date=${isoForURL(timelineFetchedUntil)}`,
    ],
    ['notificationSettings', `/accounts/${requestedEmail}/notification_settings`],
    ['competences', '/competences'],
  ]));

  while (data.timeline.data.length === 0 && data.timeline.more) {
    timelineFetchedUntil.setMonth(timelineFetchedUntil.getMonth() - monthGap);
    ({ timeline: data.timeline } = await getInitialData(this, session, new Map([
      [
        'timeline',
        `/accounts/${requestedEmail}/timeline?start_date=${isoForURL(timelineFetchedUntil)}`,
      ],
    ])));
  }

  data.timelineFetchedUntil = timelineFetchedUntil;

  if (data.account == null) {
    this.error(404, 'Profile');
  }

  data.account.csrf_token = session.account.csrf_token;
  return data;
}
