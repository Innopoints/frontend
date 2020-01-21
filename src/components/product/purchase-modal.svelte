<script>
  import Modal from 'ui/modal.svelte';
  import Button from 'ui/button.svelte';
  import TextField from 'ui/text-field.svelte';
  import UnclickableChip from 'ui/unclickable-chip.svelte';
  import Labeled from 'ui/labeled.svelte';
  import { createEventDispatcher } from 'svelte';
  import {user} from '@/store/user';
  import {openSnackbar} from '@/store/snackbar';

  export let size;
  export let name;
  export let type;
  export let price;
  export let inSizes;
  export let variety;

  let amount = 1;
  $: checkAmount(amount);
  const inc = () => amount++;
  const dec = () => amount--;
  const checkAmount = num => {
    if (num < 1) amount = 1;
    else amount = num;
  };
  $: finalPrice = $user.balance - amount*price;

  const dispatch = createEventDispatcher();
  const confirm = () => {
    if (finalPrice >= 0) {
      // closeModal();
      openSnackbar();
      dispatch('success');
    }
  };
</script>

<Modal>
  <h1>confirm your purchase</h1>

  <div class="purchase">
    <div class="identifier">
      <div class="name">{name}</div>
      <div class="type">{type}</div>
    </div>

    <div class="quantity">
      <Button isRound on:click={dec}>
        <svg src="/images/icons/minus.svg" />
      </Button>
      <TextField value={amount} on:input={(e) => checkAmount(parseInt(e.detail))} isNoSpinner type="number" />
      <Button isRound on:click={inc}>
        <svg src="/images/icons/plus.svg" />
      </Button>
    </div>
  </div>

  <div class="options">
    {#if inSizes && size}
      <span class="label size-label">size</span>
      <UnclickableChip small classname="size">{size.label}</UnclickableChip>
    {/if}
    <span class="label color-label">color</span>
    <div class="color" style={'background:' + variety.color}></div>
  </div>

  <div class="actions">
    <Labeled label="Your balance" customContent>
      <div class="delta-balance">
        <s>
          {$user.balance}
          <svg src="/images/innopoint-sharp.svg" class="innopoint" />
        </s>
        {finalPrice}
        <svg src="/images/innopoint-sharp.svg" class="innopoint" />
      </div>
    </Labeled>
    <Button isFilled on:click={confirm}>confirm</Button>
  </div>
</Modal>
