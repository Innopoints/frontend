<script>
  import { getContext } from 'svelte';
  import { Card, Autocomplete } from 'attractions';
  import { snackbarContextKey } from 'attractions/snackbar';
  import AmendBalance from '@/components/dashboard/amend-balance.svelte';
  import SendMessage from '@/components/dashboard/send-message.svelte';
  import SeeProfile from '@/components/dashboard/see-profile.svelte';
  import {
    autocompleteValueToUser,
    getUsersRaw,
    minSearchLength,
  } from '@/utils/autocomplete-users.js';

  export let account;

  async function* getUsers(query) {
    try {
      yield* getUsersRaw(query);
    } catch (e) {
      showSnackbar({ props: { text: 'Couldn\'t search for users, try reloading the page' } });
      console.error(e);
      return [];
    }
  }

  let selectedItems = [];
  $: users = selectedItems.map(autocompleteValueToUser);

  const showSnackbar = getContext(snackbarContextKey);
</script>

<Card class="individual-ctls">
  <div class="title">
    <svg src="images/icons/user.svg" class="icon" />
    Individual user controls
  </div>
  <div class="panel">
    <div class="user-selection">
      <Autocomplete
        bind:selection={selectedItems}
        getOptions={getUsers}
        {minSearchLength}
        placeholder="Start typing a name or an e-mail..."
      />
      <p>You may select several people for a certain operation.</p>
    </div>
    <div class="operations">
      <AmendBalance {users} {account} />
      <SendMessage {users} {account} />
      <SeeProfile {users} />
    </div>
  </div>
</Card>

<style src="../../../static/css/containers/dashboard/individual-controls.scss"></style>
