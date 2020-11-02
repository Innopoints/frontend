<script>
  import { getContext } from 'svelte';
  import { stores } from '@sapper/app';
  import { Button, TextField, DropdownShell, Dropdown, H1 } from 'attractions';
  import { snackbarContextKey } from 'attractions/snackbar';
  import ReclaimInnopointsModal from 'src/components/profile/reclaim-innopoints-modal.svelte';
  import * as api from 'src/utils/api.js';

  export let account;
  const telegramUsernameRegex = /(?:[A-Za-z0-9_]{5,32}|^$)/;

  const { session } = stores();

  let tgChange = false;
  let tgUsername = account.telegram_username || '';
  $: usernameValid = telegramUsernameRegex.test(tgUsername);
  let reclaimInnopointsModalOpen = false;

  async function saveUsername() {
    if (tgUsername === account.telegram_username) {
      tgChange = false;
      return;
    }

    try {
      await api.json(api.patch(`/accounts/${account.email}/telegram`, {
        data: { telegram_username: tgUsername },
        csrfToken: account.csrf_token,
      }));
      account.telegram_username = tgUsername;
      showSnackbar({ props: {
        text: `Successfully ${tgUsername === '' ? 'removed' : 'updated'} the username`,
      } });
      if ($session.account.email === account.email) {
        $session.account = account;
      }
    } catch (e) {
      showSnackbar({ props: { text: 'Something went wrong, try reloading the page' } });
      console.error(e);
    }

    tgChange = false;
  }

  const showSnackbar = getContext(snackbarContextKey);
</script>

<section class="quick-info padded">
  <div class="personal">
    <H1 class="btn-align">{account.full_name}</H1>
    {#if tgChange}
      <div class="telegram input">
        <TextField
          bind:value={tgUsername}
          autofocus
          outline
          withItem
          label="Telegram"
          labelClass="label"
          pattern="[A-Za-z0-9_]*"
          minlength={5}
          maxlength={32}
          error={!usernameValid && "A username should contain from 5 to 32 symbols: a–z, 0–9, _."}
          class="mt-2"
        >
          <svg src="static/images/icons/at-sign.svg" class="item" />
        </TextField>
        <div class="actions">
          <Button class="mr" on:click={() => tgChange = false}>cancel</Button>
          <Button on:click={saveUsername} filled disabled={!usernameValid}>save</Button>
        </div>
      </div>
    {:else if account.telegram_username}
      <div class="telegram exists">
        @{account.telegram_username}
        <Button class="ml" on:click={() => tgChange = true}>
          <svg src="static/images/icons/edit.svg" class="mr" />
          edit
        </Button>
      </div>
    {:else}
      <div class="telegram">
        <Button outline on:click={() => tgChange = true}>
          <svg src="static/images/icons/send.svg" class="mr" />
          add Telegram username
        </Button>
        <DropdownShell let:toggle>
          <Button round class="ml" on:click={toggle}>
            <svg src="static/images/icons/help-circle.svg" class="icon" />
          </Button>
          <Dropdown class="info-bubble" right>
            Some event organizers prefer to collect those to ease communication.
          </Dropdown>
        </DropdownShell>
      </div>
    {/if}
  </div>

  <div class="balance">
    <p class="btn-align">
      <span>{account.balance}</span>
      <svg src="static/images/innopoint-sharp.svg" class="innopoint" />
      available
    </p>
    <nav class="btn-shift">
      <Button href="/products">
        <svg src="static/images/icons/shopping-bag.svg" class="mr" />
        go to the InnoStore
      </Button>
      <Button on:click={() => reclaimInnopointsModalOpen = true}>
        <svg src="static/images/icons/gift.svg" class="mr" />
        reclaim old innopoints
      </Button>
    </nav>
  </div>
</section>

<ReclaimInnopointsModal
  {account}
  bind:open={reclaimInnopointsModalOpen}
  on:reclaim-innopoints={({ detail }) => account = detail}
/>

<style src="../../../static/css/containers/profile/info.scss"></style>
