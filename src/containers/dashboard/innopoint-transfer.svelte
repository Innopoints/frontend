<script>
  import Card from 'ui/card.svelte';
  import Autocomplete from 'ui/autocomplete.svelte';
  import SendMoney from '@/components/dashboard/send-money.svelte';
  import SendComment from '@/components/dashboard/send-comment.svelte';
  import SeeProfile from '@/components/dashboard/see-profile.svelte';
  import getUsers from '@/utils/list-users.js';
  let selectedItems = [];
  $: users = selectedItems.map(item => ({ full_name: item.name, email: item.details }));
</script>

<Card classname="card individual-ctls">
  <div class="title">
    <svg src="/images/icons/user.svg" class="icon" />
    Individual user controls
  </div>
  <div class="panel">
    <div class="user-selection">
      <Autocomplete bind:selection={selectedItems} getOptions={getUsers} />
      <p>You may select several people for a certain operation.</p>
    </div>
    <div class="operations">
      <SendMoney {users} />
      <SendComment {users} />
      <SeeProfile {users} />
    </div>
  </div>
</Card>
