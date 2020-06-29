<script>
  import { range } from 'attraction/utils';

  export let value;
  export let max = 5;
</script>

<div class="stars">
  {#each [...range(max)] as i}
    {#if i < value}
      <svg class="star" src="static/images/icons/star.svg" />
    {:else}
      <svg class="star off" src="static/images/icons/star.svg" />
    {/if}
  {/each}
</div>

<style src="../../../static/css/components/common/stars.scss"></style>
