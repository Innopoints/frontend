<script>
  export let classname = '';
  export let titleclass = '';
  export let subtitleclass = '';
  export let requiredclass = '';
  export let wrapperclass = '';

  export let title = '';
  export let subtitle = '';
  export let required = false;
  export let id = null;
  export let error = false;
</script>

<div class="form-field {classname}" class:error>
  <label for={id}>
    <slot name="title">
      <span class="name {titleclass}">
        {title}
        {#if required}
          <span class="required {requiredclass}">*</span>
        {/if}
      </span>
    </slot>
    <slot name="subtitle">
      {#if subtitle}
        <span class="desc {subtitleclass}">
          {subtitle}
        </span>
      {/if}
    </slot>
  </label>
  <div class="text-field-wrapper {wrapperclass}">
    <slot />
    {#if required}
      <span class="required {requiredclass}">* Required</span>
    {/if}
  </div>
</div>
