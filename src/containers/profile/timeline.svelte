<script>
  import { createEventDispatcher } from 'svelte';
  import Button from 'ui/button.svelte';
  import TimelineEntry from '@/components/profile/timeline-entry.svelte';

  export let timelinePromises;

  let loadMore = false;
  const dispatch = createEventDispatcher();
  const dateFormatter = new Intl.DateTimeFormat('en', {
    hour: '2-digit',
    year: 'numeric',
    minute: '2-digit',
    day: '2-digit',
    month: 'short',
    hour12: false,
  });

  function requestMore() {
    loadMore = false;
    dispatch('more-timeline');
  }
</script>

<div class="timeline">
  {#if timelinePromises.length}
    {#each timelinePromises as promise}
      {#await promise.then(value => { loadMore = value.more; return value.data; })}
        Just waiting chilling
      {:then timelineFragment}
        {#each timelineFragment as entry}
          <TimelineEntry {...entry} {dateFormatter} on:leave-feedback />
        {/each}
      {/await}
    {/each}

    {#if loadMore}
      <Button classname="more" on:click={requestMore}>
        <svg src="images/icons/more-horizontal.svg" class="icon mr-2" />
        more
      </Button>
    {/if}
  {:else}
    <div class="empty small">
      <div class="icon">
        <svg src="/images/icons/list.svg" />
      </div>
      <div class="title">No recent events</div>
      <div class="subtitle">How about some volunteering?</div>
    </div>
  {/if}
</div>
