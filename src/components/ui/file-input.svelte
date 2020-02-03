<script>
  import ripple from 'ui/utils/ripple.js';
  
  export let disabled = false;
</script>

<label class="file-input">
  <input type="file" on:change {disabled} />
  <div class="handle" use:ripple>
    <svg src="/images/icons/image.svg" class="icon mr" />
    upload cover image
  </div>
</label>
