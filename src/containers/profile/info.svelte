<script>
  import Button from 'ui/button.svelte';
  import TextField from 'ui/text-field.svelte';
  import Dropdown from 'ui/dropdown.svelte';
  import { user, changeUserField } from '@/store/user';

  let tgVal = '';
  let tgChange = false;

  function toggleTgChange(bool) {
    tgChange = bool;
  }

  function save() {
    if (tgVal !== '') changeUserField('telegram', tgVal);
    tgChange = false;
  }
</script>

<section class="quick-info padded">
  <div class="personal">
    <h1 class="btn-align">{$user.name} {$user.surname}</h1>
    {#if tgChange}
      <div class="telegram input">
        <TextField
          bind:value={tgVal}
          id="username"
          outline
          label="Telegram"
          item
          pattern="[A-Za-z0-9_]&#123;5,32&#125;"
          error="A username should contain from 5 to 32 symbols: a–z, 0–9, _."
          classname="mt-2">
          <svg src="images/icons/at-sign.svg" class="item" />
        </TextField>
        <div class="actions">
          <Button on:click="{() => toggleTgChange(false)}" classname="mr">
            cancel
          </Button>
          <Button on:click={save} filled>save</Button>
        </div>
      </div>
    {:else if $user.telegram}
      <div class="telegram exists">
        @{$user.telegram}
        <Button on:click="{() => toggleTgChange(true)}" classname="ml">
          <svg src="images/icons/edit.svg" class="icon mr" />
          edit
        </Button>
      </div>
    {:else}
      <div class="telegram">
        <Button on:click="{() => toggleTgChange(true)}" isOutline>
          <svg src="images/icons/send.svg" class="icon mr" />
          add Telegram username
        </Button>

        <Dropdown dropdownclass="info-bubble" btnclass="round" chevron={false} right>
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
      <span>{$user.balance}</span>
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
