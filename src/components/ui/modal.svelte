<script>
  import Card from './card.svelte';
  import Button from './button.svelte';
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';

  export let classname = 'modal-overlay column';
  export let cardclass = 'card';
  export let openerclass = 'modal-open';

  export let value = false;
  $: toggleBodyClass(value);

  let modal = null;
  onMount(() => document.body.appendChild(modal));
  onDestroy(() => document.body.removeChild(modal));

  const dispatch = createEventDispatcher();
  const close = () => {
    value = false;
    dispatch('close');
    dispatch('change', value);
  };
  const toggleBodyClass = (val) => {
    if (val) document.body.classList.add(openerclass);
    else document.body.classList.remove(openerclass);
  };
</script>

<div bind:this={modal} class={classname} on:click={close}>
  <Card classname={cardclass}>
    <Button isNormal isRound classname="close btn">
      <svg src="/images/icons/x.svg" />
    </Button>
    <slot />
  </Card>
</div>
