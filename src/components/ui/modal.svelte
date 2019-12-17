<script>
  import Card from './card.svelte';
  import Button from './button.svelte';
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';

  export let classname = 'modal-overlay column';
  export let cardclass = 'card';
  export let openerclass = 'modal-open';
  export let overlaydisplay = 'block';
  export let closebutton = true;

  export let value = false;
  $: toggleBodyClass(value);

  let modal = null;
  onMount(() => document.body.appendChild(modal));
  onDestroy(() => document.body.removeChild(modal));

  const dispatch = createEventDispatcher();
  const close = (e, isCloser) => {
    if (e.target === modal || isCloser) {
      value = false;
      dispatch('close');
    }
  };
  const toggleBodyClass = (val) => {
    if (val) {
      document.body.classList.add(openerclass);
      document.querySelector('html').style.overflow = 'hidden';
    } else {
      document.body.classList.remove(openerclass);
      document.querySelector('html').style.overflow = 'initial';
    }
  };
</script>

<div style={'display:'+ (value ? overlaydisplay : 'none')} bind:this={modal} class={classname} on:click={close}>
  <Card classname={cardclass}>
    {#if closebutton}
      <Button isNormal isRound classname="close btn" on:click={(e) => close(e, true)}>
        <svg src="/images/icons/x.svg" />
      </Button>
    {/if}
    <slot />
  </Card>
</div>
