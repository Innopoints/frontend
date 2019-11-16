<script>
  import Button from 'ui/button.svelte';
  import TextField from 'ui/text-field.svelte';

  import {filters, changeSpots} from '@/store/projects';
</script>

<li class="filter spots">
  <div class="align-center">
    <svg src="images/icons/users.svg" class="icon mr" />
    <span class="name">vacant spots</span>
  </div>
  <div class="align-center">
    <Button isRound on:click={() => changeSpots($filters.spots - 1)}>
      <svg src="images/icons/minus.svg" class="icon" />
    </Button>
    <TextField
        value={$filters.spots}
        type="number"
        classname="no-spinner"
        on:input={(e) => changeSpots(e.detail)}
    />
    <Button isRound on:click={() => changeSpots($filters.spots + 1)}>
      <svg src="images/icons/plus.svg" class="icon" />
    </Button>
  </div>
</li>
