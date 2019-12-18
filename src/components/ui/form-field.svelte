<script>
  export let classname = 'form-field';
  export let titleclass = 'name';
  export let subtitleclass = 'desc';
  export let requiredclass = 'required';
  export let wrapperclass = 'text-field-wrapper';

  export let title = '';
  export let subtitle = '';
  export let required = false;
  export let id = null;
</script>

<div class={classname}>
  <label for={id}>
    <slot name="title">
      <span class={titleclass}>
        {title}
        {#if required}
          <span class={requiredclass}>*</span>
        {/if}
      </span>
    </slot>
    <slot name="subtitle">
      <span class={subtitleclass}>
        {subtitle}
      </span>
    </slot>
  </label>
  <div class={wrapperclass}>
    <slot />
    {#if required}
      <span class={requiredclass}>* Required</span>
    {/if}
  </div>
</div>
