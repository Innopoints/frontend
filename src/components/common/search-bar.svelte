<script>
  import TextField from 'ui/text-field.svelte';

  export let value = '';
  export let placeholder = 'Type to search';
</script>

<TextField on:input {placeholder} isWithItem {value}>
  <svg src="images/icons/search.svg" class="item" />
</TextField>
