<script>
  export let img;
  export let color = '#FFF';
</script>

<div class="card" class:with-image={img} id={$$props.id}>
  <slot name="image">
    {#if img}
      <img src={img} style={'background: ' + color} class="image" alt="" />
    {/if}
  </slot>
  {#if img}
    <div class="content">
      <slot />
    </div>
  {:else}
    <slot />
  {/if}
</div>
