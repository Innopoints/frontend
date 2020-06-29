<script>
  import { TextField } from 'attractions';

  export let value = '';
  export let placeholder = 'Type to search';
</script>

<TextField on:input {placeholder} withItem {value} type="search" maxlength={256}>
  <svg src="static/images/icons/search.svg" class="item" />
</TextField>
