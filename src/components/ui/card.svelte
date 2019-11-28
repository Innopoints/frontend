<script>
  import { createEventDispatcher } from 'svelte';
  export let classname = 'card';
  export let contentclass = 'content';
  export let imgwrapclass = 'image';
  export let imgclass = 'image';

  export let id = null;
  export let img = null;
  export let imgWrap = true;
  export let color = '#FFF';
  const dispatch = createEventDispatcher();
</script>

<div class={classname} class:with-image={img} {id} on:click={(e) => dispatch('click', e)}>
  {#if img}
    {#if imgWrap}
      <div class={imgwrapclass}>
        <slot name="image">
          <img src={img} style="{'background: ' + color}" class={imgclass} alt="" />
        </slot>
        <slot name="radio" />
      </div>
    {:else}
      <slot name="image">
        <img src={img} style="{'background: ' + color}" class={imgclass} alt="" />
      </slot>
    {/if}
    <div class={contentclass}>
      <slot />
    </div>
  {:else}
    <slot />
  {/if}
</div>
