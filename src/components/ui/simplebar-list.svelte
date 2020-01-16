<script>
  import { onMount, createEventDispatcher } from 'svelte';
  import 'simplebar/dist/simplebar.css';
  import SimpleBar from 'simplebar';

  export let classname = '';
  export let options = {};
  export let scrollThreshold = 3;

  let atTop = true;
  let atBottom = false;

  let element;
  let scrollElement;
  let contentElement;

  onMount(() => {
    new SimpleBar(element, options);
    if (scrollElement.scrollHeight
      - scrollElement.offsetHeight
      - scrollElement.scrollTop < scrollThreshold) {
      atBottom = true;
    }
  });

  const dispatch = createEventDispatcher();

  function watchScroll(event) {
    if (this.scrollTop < scrollThreshold) {
      atTop = true;
    } else if (this.scrollHeight - this.offsetHeight - this.scrollTop < scrollThreshold) {
      atBottom = true;
    } else {
      atTop = false;
      atBottom = false;
    }
    dispatch('scroll', event);
  }
</script>

<svelte:head>
  <noscript>
    <style>
      [data-simplebar] {
        overflow: auto;
      }
    </style>
  </noscript>
</svelte:head>

<ul bind:this={element} class={classname}>
  <div class="simplebar-wrapper">
    <div class="simplebar-height-auto-observer-wrapper">
      <div class="simplebar-height-auto-observer" />
    </div>
    <div class="simplebar-mask">
      <div class="simplebar-offset" class:at-top={atTop} class:at-bottom={atBottom}>
        <div class="simplebar-content-wrapper" bind:this={scrollElement} on:scroll={watchScroll}>
          <div class="simplebar-content" bind:this={contentElement}>
            <slot />
          </div>
        </div>
      </div>
    </div>
    <div class="simplebar-placeholder" />
  </div>
  <div class="simplebar-track simplebar-horizontal">
    <div class="simplebar-scrollbar" />
  </div>
  <div class="simplebar-track simplebar-vertical">
    <div class="simplebar-scrollbar" />
  </div>
</ul>
