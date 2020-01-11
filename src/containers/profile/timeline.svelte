<script>
  import Button from 'ui/button.svelte';
  import Entry from '@/components/profile/timeline-entry.svelte';
  import timeline from '@/constants/profile/timeline';

  export let loadMore = false;
</script>

<div class="timeline">
  <slot />
  {#if timeline.length}
    {#each timeline as entry, i (i)}
      <Entry type={entry.type} action={entry.action} important={entry.important || false} />
    {/each}

    {#if loadMore}
      <Button classname="more btn">
        <svg src="images/icons/more-horizontal.svg" class="icon mr-2" />
        more
      </Button>
    {/if}
  {:else}
    <div class="empty small">
      <svg class="icon" src="/images/icons/list.svg" />
      <div class="title">No recent events</div>
      <div class="subtitle">How about some volunteering?</div>
    </div>
  {/if}
</div>
