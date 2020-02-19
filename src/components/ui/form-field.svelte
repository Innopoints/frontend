<script>
  export let classname = '';
  export let titleclass = '';
  export let subtitleclass = '';
  export let requiredclass = '';
  export let wrapperclass = 'text-field-wrapper';
  export let errorclass = '';

  export let title = '';
  export let subtitle = '';
  export let required = false;
  export let id = null;
  export let error = null;
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
  <div class={wrapperclass}>
    <slot />
    {#if error}
      <span class="helper error {errorclass}">{error}</span>
    {:else if required}
      <span class="helper required {requiredclass}">* Required</span>
    {/if}
  </div>
</div>
