<script>
  import { createEventDispatcher } from 'svelte';
  import Button from 'ui/button.svelte';
  import TextField from 'ui/text-field.svelte';
  import Dropdown from 'ui/dropdown.svelte';

  export let account;

  let tgChange = false;
  let tgUsername = account.telegram_username || '';

  const dispatch = createEventDispatcher();

  function saveUsername() {
    if (tgUsername !== '' && tgUsername !== account.telegram_username) {
      dispatch('username-change', tgUsername);
    }
    tgChange = false;
  }
</script>

<section class="quick-info padded">
  <div class="personal">
    <h1 class="btn-align">{account.full_name}</h1>
    {#if tgChange}
      <div class="telegram input">
        <TextField
          bind:value={tgUsername}
          autofocus
          isOutline
          isWithItem
          label="Telegram"
          pattern="[A-Za-z0-9_]*"
          minlength={5}
          maxlength={32}
          error="A username should contain from 5 to 32 symbols: a–z, 0–9, _."
          classname="mt-2"
        >
          <svg src="images/icons/at-sign.svg" class="item" />
        </TextField>
        <div class="actions">
          <Button on:click="{() => tgChange = false}" classname="mr btn">
            cancel
          </Button>
          <Button on:click={saveUsername} isFilled>save</Button>
        </div>
      </div>
    {:else if account.telegram_username}
      <div class="telegram exists">
        @{account.telegram_username}
        <Button on:click="{() => tgChange = true}" classname="ml btn">
          <svg src="images/icons/edit.svg" class="icon mr" />
          edit
        </Button>
      </div>
    {:else}
      <div class="telegram">
        <Button on:click="{() => tgChange = true}" isOutline>
          <svg src="images/icons/send.svg" class="icon mr" />
          add Telegram username
        </Button>
        <Dropdown dropdownclass="info-bubble" handleclass="round" chevron={false} isRight>
          <svg slot="label" src="images/icons/help-circle.svg" class="icon" />
          Some event organizers prefer to collect those to ease communication.
          Adding one here will save you the typing for those
          occasions (you will still be able to control what you send).
        </Dropdown>
      </div>
    {/if}
  </div>

  <div class="balance">
    <p class="btn-align">
      <span>{account.balance}</span>
      <svg src="images/innopoint-sharp.svg" class="innopoint" />
      available
    </p>
    <nav class="btn-shift">
      <Button href="/store">
        <svg src="images/icons/shopping-bag.svg" class="icon mr" />
        go to the InnoStore
      </Button>
    </nav>
  </div>
</section>
