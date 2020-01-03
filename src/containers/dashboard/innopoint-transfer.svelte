<script>
  import Card from 'ui/card.svelte';
  import AutoComplete from '@/components/projects/new/autocomplete.svelte';
  import SendMoney from '@/components/dashboard/send-money.svelte';
  import SendComment from '@/components/dashboard/send-comment.svelte';
  import SeeProfile from '@/components/dashboard/see-profile.svelte';
  import options from '@/constants/autocomplete-options';
  let users = [];
</script>

<Card classname="card individual-ctls">
  <div class="title">
    <svg src="/images/icons/user.svg" class="icon" />
    Individual user controls
  </div>
  <div class="panel">
    <div class="user-selection">
      <AutoComplete bind:value={users} {options} />
      <p>You may select several people for a certain operation.</p>
    </div>
    <div class="operations">
      <SendMoney {users} />
      <SendComment {users} />
      <SeeProfile {users} />
    </div>
  </div>
</Card>
