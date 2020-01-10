<script>
  import range from 'ui/utils/range.js';
  export let classname = '';
  export let starclass = '';

  export let value = null;
  export let max = 5;
  export let name;
</script>

<div role="group" class="star-rating {classname}">
  {#each [...range(max, 0, -1)] as i}
    <input bind:group={value} value={i} type="radio" name={name} id={`${name}-${i}`}>
    <label for={`${name}-${i}`}>
      <svg src="images/icons/star.svg" class="star {starclass}" />
    </label>
  {/each}
</div>
