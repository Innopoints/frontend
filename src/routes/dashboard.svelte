<script context="module">
  import getInitialData from 'src/utils/get-initial-data.js';

  export async function preload(page, session) {
    const data = await getInitialData(this, session, new Map([
      ['purchases', '/stock_changes/for_review'],
      ['reviews', '/projects/for_review'],
      ['tags', '/tags'],
    ]));

    if (session.account == null || !session.account.is_admin) {
      this.error(403, 'Dashboard');
    }

    data.account = session.account;
    return data;
  }
</script>

<script>
  import { Button, H1 } from 'attractions';
  import Reviews from 'src/containers/dashboard/reviews.svelte';
  import Purchases from 'src/containers/dashboard/purchases.svelte';
  import IndividualControls from 'src/containers/dashboard/individual-controls.svelte';
  import TagEditor from 'src/containers/dashboard/tag-editor.svelte';

  export let reviews;
  export let account;
  export let purchases;
  export let tags;
</script>

<svelte:head>
  <title>Admin Dashboard</title>
</svelte:head>

<div class="material">
  <H1 class="padded">
    Dashboard
    <Button outline href="/profile">
      <svg src="static/images/icons/user.svg" class="mr" />
      go to profile
    </Button>
  </H1>
  <div class="cards padded">
    <Reviews {reviews} />
    <Purchases {purchases} />
    <IndividualControls {account} />
    <TagEditor {tags} {account} />
  </div>
</div>

<style src="../../static/css/routes/dashboard.scss"></style>
