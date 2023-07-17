import getInitialData from 'src/utils/get-initial-data.js';

export async function load(page) {
  const data = await getInitialData(this, session, new Map([
    ['purchases', '/stock_changes/for_review'],
    ['reviews', '/projects/for_review'],
    ['competences', '/competences'],
    ['groups', '/accounts/groups'],
    ['tags', '/tags'],
  ]));

  if (session.account == null || !session.account.is_admin) {
    this.error(403, 'Dashboard');
  }

  data.account = session.account;
  return data;
}
