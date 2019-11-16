<script>
  import Button from 'ui/button.svelte';
  import Entry from '@/components/profile/timeline-entry.svelte';
  import timeline from '@/constants/profile/timeline';

  export let loadMore = false;
</script>

<div class="timeline">
  <slot />

  {#each timeline as entry, i (i)}
    <Entry type={entry.type} action={entry.action} important={entry.important || false} />
  {/each}

  {#if loadMore}
    <Button classname="more">
      <svg src="images/icons/more-horizontal.svg" class="icon mr-2" />
      more
    </Button>
  {/if}
</div>
