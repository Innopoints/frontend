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
  <div class="handle" use:ripple>
  <input type="file" on:change {disabled} {...additionalProps} />
    <svg src="/images/icons/image.svg" class="icon mr" />
    upload cover image
  </div>
</label>
