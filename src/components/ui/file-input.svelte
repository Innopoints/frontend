<script>
  import ripple from 'ui/utils/ripple.js';

  export let disabled = false;
  export let accept = null;
  let additionalProps = {};
  if (accept != null) {
    additionalProps.accept = accept;
  }
</script>

<label class="file-input">
  <input type="file" on:change {disabled} {...additionalProps} />
  <div class="handle" use:ripple={{ disabled }}>
    <svg src="/images/icons/image.svg" class="icon mr" />
    upload cover image
  </div>
</label>
