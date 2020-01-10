<script>
  import Card from 'ui/card.svelte';
  import Autocomplete from 'ui/autocomplete.svelte';
  import SendMoney from '@/components/dashboard/send-money.svelte';
  import SendComment from '@/components/dashboard/send-comment.svelte';
  import SeeProfile from '@/components/dashboard/see-profile.svelte';
  import getUsers from '@/constants/autocomplete-options';
  let users = [];
</script>

<Card classname="card individual-ctls">
  <div class="title">
    <svg src="/images/icons/user.svg" class="icon" />
    Individual user controls
  </div>
  <div class="panel">
    <div class="user-selection">
      <Autocomplete bind:values={users} getOptions={getUsers} />
      <p>You may select several people for a certain operation.</p>
    </div>
    <div class="operations">
      <SendMoney {users} />
      <SendComment {users} />
      <SeeProfile {users} />
    </div>
  </div>
</Card>
