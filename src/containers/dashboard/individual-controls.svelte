<script>
  import { Card, Autocomplete } from 'attractions';
  import AmendBalance from '@/components/dashboard/amend-balance.svelte';
  import SendMessage from '@/components/dashboard/send-message.svelte';
  import SeeProfile from '@/components/dashboard/see-profile.svelte';
  import getUsers from '@/utils/list-users.js';

  export let account;

  let selectedItems = [];
  $: users = selectedItems.map(item => ({ full_name: item.name, email: item.details }));
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
