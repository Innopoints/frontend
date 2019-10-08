<script>
  export let title = '';
  export let subtitle = '';
  export let required = false;
  export let classname = '';
  export let id = null;
</script>

<div class="{'form-field ' + classname}">
  <label for={id}>
      <span class="name">
        {title}
        {#if required}<span class="required">*</span>{/if}
      </span>
      <span class="desc">
        {subtitle}
      </span>
  </label>
  <div class="text-field-wrapper">
    <slot />
    {#if required}<span class="required">* Required</span>{/if}
  </div>
</div>
