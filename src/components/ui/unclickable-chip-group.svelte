<script>
  export let classname = '';
  export let chipclass = '';
  export let small = false;
  export let outline = false;

  export let values;
</script>

<div role="group" class={classname}>
  {#each values as loopValue, i (i)}
    <div class:small class:outline class="chip unclickable {chipclass}">
      {loopValue}
    </div>
  {/each}
</div>
