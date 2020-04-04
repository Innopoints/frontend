<script>
  import { createEventDispatcher } from 'svelte';
  import Button from 'ui/button.svelte';
  import TimelineEntry from '@/components/profile/timeline-entry.svelte';

  export let timelinePromises;

  const dispatch = createEventDispatcher();

  function requestMore() {
    dispatch('more-timeline');
  }
</script>

<div class="timeline">
  {#if timelinePromises.length}
    {#each timelinePromises as promise}
      {#await promise.then(value => value.data)}
        <div class="loading">
          <div class="icon">
            <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
          </div>
          <p>Loading...</p>
        </div>
      {:then timelineFragment}
        {#each timelineFragment as entry}
          <TimelineEntry {...entry} on:leave-feedback />
        {/each}
      {/await}
    {/each}

    {#await Promise.all(timelinePromises).then(values => values[values.length - 1]) then lastValue}
      {#if lastValue != null && lastValue.more}
        <Button classname="more" on:click={requestMore}>
          <svg src="images/icons/more-horizontal.svg" class="icon mr-2" />
          load more
        </Button>
      {/if}
    {/await}
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
