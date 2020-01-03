<script>
  import TextField from 'ui/text-field.svelte';
  import Button from 'ui/button.svelte';
  export let users = [];
  $: {
    if (users.length) success = false;
  }
  let amount = null;
  let success = false;
  const send = () => {
    amount = null;
    success = true;
  };
</script>

<div class="amend-balance">
  <header>
    <svg src="/images/icons/credit-card.svg" class="icon mr-2" />
    Add/subtract innopoints
  </header>
  <div class="subtitle">Supply a negative quantity to subtract innopoints.</div>
  <form>
    <TextField
      bind:value={amount}
      placeholder="0"
      type="number"
      isWithItem
      isItemRight
      on:input={() => success = false}
    >
      <svg src="/images/innopoint-sharp.svg" class="item innopoint" />
    </TextField>
    <Button isRound disabled={!amount} on:click={send}>
      <svg src="/images/icons/check.svg" class="icon" />
    </Button>
    {#if success}
      <span class="status good">success!</span>
    {/if}
    <span class="status bad" style="display: none;">failed, please, retry :(</span>
  </form>
</div>
