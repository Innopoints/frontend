<script>
  import { getContext } from 'svelte';
  import { TextField, Button } from 'attractions';
  import { snackbarContextKey } from 'attractions/snackbar';
  import { s } from 'attractions/utils';
  import * as api from 'src/utils/api.js';

  export let users = [];
  export let account;

  let amount = '';

  async function send() {
    try {
      const promises = users.map(user => api.json(api.patch(`/accounts/${user.email}/balance`, {
        data: {
          change: amount,
        },
        csrfToken: account.csrf_token,
      })));
      await Promise.all(promises);
      showSnackbar({
        props: {
          text: `Successfully ${amount >= 0 ? 'added' : 'deducted'}`
                + ` ${Math.abs(amount)} innopoint${s(Math.abs(amount))}`,
        },
      });
      amount = '';
    } catch (e) {
      console.error(e);
      showSnackbar({ props: { text: 'Something went wrong, try reloading the page' } });
    }
  }

  const showSnackbar = getContext(snackbarContextKey);
</script>

<div class="amend-balance">
  <header>
    <svg src="static/images/icons/credit-card.svg" class="icon mr-2" />
    Add/subtract innopoints
  </header>
  <div class="subtitle">Supply a negative quantity to subtract innopoints.</div>
  <div class="form">
    <TextField
      bind:value={amount}
      placeholder="0"
      type="number"
      withItem
      itemRight
      maxlength={8}
      id="amend-balance"
    >
      <svg src="static/images/innopoint-sharp.svg" class="item innopoint" />
    </TextField>
    <Button round disabled={!amount || users.length === 0} on:click={send}>
      <svg src="static/images/icons/check.svg" class="icon" />
    </Button>
  </div>
</div>

<style src="../../../static/css/components/dashboard/amend-balance.scss"></style>
