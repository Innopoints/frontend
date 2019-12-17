<script>
  import Modal from 'ui/modal.svelte';
  import Button from 'ui/button.svelte';
  import TextField from 'ui/text-field.svelte';
  import Chip from 'ui/chip.svelte';
  import Labeled from 'ui/labeled.svelte';
  import {user} from '@/store/user';
  import {open, closeModal} from '@/store/modal';

  export let size;
  export let name;
  export let type;
  export let price;
  export let inSizes;
  export let variety;
</script>

<Modal value={$open} on:close={closeModal}>
  <h1>confirm your purchase</h1>

  <div class="purchase">
    <div class="identifier">
      <div class="name">{name}</div>
      <div class="type">{type}</div>
    </div>

    <div class="quantity">
      <Button isRound>
        <svg src="/images/icons/minus.svg" />
      </Button>
      <TextField value={1} isNoSpinner type="number" />
      <Button isRound>
        <svg src="/images/icons/plus.svg" />
      </Button>
    </div>
  </div>

  <div class="options">
    {#if inSizes && size}
      <span class="label size-label">size</span>
      <Chip isSmall unclickable chipclass="chip size">{size.label}</Chip>
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
        {$user.balance - price}
        <svg src="/images/innopoint-sharp.svg" class="innopoint" />
      </div>
    </Labeled>
    <Button isFilled>confirm</Button>
  </div>
</Modal>
