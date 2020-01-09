<script>
  export let classname = '';
  export let id = '';
</script>

<div class="card {classname}" {id}>
  <slot />
</div>
