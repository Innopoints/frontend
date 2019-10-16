<script>
  export let id = null;
  export let img = null;
  export let imgWrap = true;
  export let color = '#FFF';
</script>

<div class="card" class:with-image={img} {id}>
  {#if img}
    {#if imgWrap}
      <div class="image">
        <slot name="image">
          <img src={img} style="{'background: ' + color}" class="image" alt="" />
        </slot>
        <slot name="radio" />
      </div>
    {:else}
      <slot name="image">
        <img src={img} style="{'background: ' + color}" class="image" alt="" />
      </slot>
    {/if}
    <div class="content">
      <slot />
    </div>
  {:else}
    <slot />
  {/if}
</div>
