<script>
  import { createEventDispatcher, getContext } from 'svelte';
  import { Modal, Dialog, Button, TextField, Chip, Label } from 'attractions';
  import { snackbarContextKey } from 'attractions/snackbar';
  import { getColorPickerStyles } from 'attractions/utils';
  import Labeled from 'src/components/common/labeled.svelte';
  import * as api from 'src/utils/api.js';

  export let open = false;
  export let product;
  export let variety;
  export let account;

  let quantity = 1;
  let loading = false;

  function decreaseQuantity() {
    if (quantity > 1) {
      quantity--;
    }
  }

  function increaseQuantity() {
    if (quantity < variety.amount) {
      quantity++;
    }
  }

  async function confirmPurchase() {
    loading = true;
    try {
      await api.json(api.post(
        `/products/${product.id}/varieties/${variety.id}/purchase`,
        { data: { amount: quantity }, csrfToken: account.csrf_token },
      ));
      account.balance -= product.price * quantity;
      variety.amount -= quantity;
      dispatch('rerender');
      showSnackbar({ props: { text: 'Purchase successful! Track its status in the profile' } });
      open = false;
    } catch (e) {
      showSnackbar({ props: { text: 'Purchase didn\'t go through, try reloading the page' } });
      console.error(e);
    }
    loading = false;
  }

  const showSnackbar = getContext(snackbarContextKey);
  const dispatch = createEventDispatcher();
</script>

<Modal bind:open let:closeCallback>
  {#if variety != null}
    <Dialog title="Confirm your purchase" {closeCallback}>
      <div class="purchase">
        <div class="identifier">
          <div class="name">
            {product.name}
          </div>
          {#if product.type}
            <div class="type">
              {product.type}
            </div>
          {/if}
        </div>
        <div class="quantity">
          <Button round on:click={decreaseQuantity} disabled={quantity === 1}>
            <svg src="static/images/icons/minus.svg" />
          </Button>
          <TextField
            type="number"
            spinner={false}
            bind:value={quantity}
            min={1}
            max={variety.amount}
          />
          <Button round on:click={increaseQuantity} disabled={quantity === variety.amount}>
            <svg src="static/images/icons/plus.svg" />
          </Button>
        </div>
      </div>
      <div class="options">
        {#if variety.size != null}
          <Label class="size-label">Size</Label>
          <Chip small class="size">{variety.size}</Chip>
        {/if}
        {#if variety.color != null}
          <Label class="color-label">Color</Label>
          <div class="color" style={getColorPickerStyles(variety.color)} />
        {/if}
      </div>
      <div class="actions">
        {#if !isNaN(+quantity)
          && quantity >= 1
          && quantity <= variety.amount}
          <Labeled label="Your balance">
            <div class="delta-balance">
              <s>
                {account.balance}
                <svg src="static/images/innopoint-sharp.svg" />
              </s>
              {account.balance - product.price * quantity}
              <svg src="static/images/innopoint-sharp.svg" />
            </div>
          </Labeled>
        {:else}
          <div />
        {/if}
        <Button
          filled
          disabled={loading || account.balance < product.price * quantity || quantity > variety.amount}
          on:click={confirmPurchase}
        >
          confirm
        </Button>
      </div>
    </Dialog>
  {/if}
</Modal>

<style src="../../../../static/css/components/products/view/purchase-modal.scss"></style>
