<script>
  import Button from 'ui/button.svelte';
  import dynamic from 'ui/utils/dynamic-transition.js';
  import { fly } from 'svelte/transition';
  export let classname = '';
  export let isDanger = false;
  export let isNotice = false;

  export let title = null;
  export let closeCallback = null;
  export let transition = fly;
  export let transitionOptions = { y: 10, duration: 150 };
</script>

<div
  class="dialog {classname}"
  class:danger={isDanger}
  class:notice={isNotice}
  transition:dynamic={{ transition, options: transitionOptions }}
>
  {#if closeCallback !== null}
    <Button isNormal isRound classname="close" on:click={closeCallback}>
      <svg src="/images/icons/x.svg" class="icon" />
    </Button>
  {/if}
  {#if title !== null}
    <div class="title">
      <slot name="icon" />
      {title}
    </div>
  {/if}
  <slot name="content" />
</div>
