<script>
  import Card from 'ui/card.svelte';
  import AutoComplete from '@/components/projects/new/autocomplete.svelte';
  import TransferOperations from '@/components/dashboard/transfer-operations.svelte';
</script>

<Card classname="card individual-ctls">
  <div class="title">
    <svg src="/images/icons/user.svg" class="icon" />
    Individual user controls
  </div>
  <div class="panel">
    <div class="user-selection">
      <AutoComplete />
      <p>You may select several people for a certain operation.</p>
    </div>
    <TransferOperations />
  </div>
</Card>
