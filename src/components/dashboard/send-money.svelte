<script>
  import TextField from 'ui/text-field.svelte';
  import Button from 'ui/button.svelte';
  import { patch } from '@/utils/api.js';
  export let users = [];

  let amount = null;
  let success = false;
  let error = null;

  async function send() {
    error = null;
    try {
      const emails = users.map(user => user.email);
      const promises = emails.map(email => patch(`/accounts/${email}/balance`, {
        data: {
          change: amount,
        },
      }));
      await Promise.all(promises);
      success = true;
      amount = null;
      setTimeout(() => success = false, 1500);
    } catch (e) {
      console.error(e);
      success = false;
      error = e;
    }
  }
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
    {:else if error}
      <span class="status bad">failed, please, retry :(</span>
    {/if}
  </form>
</div>
