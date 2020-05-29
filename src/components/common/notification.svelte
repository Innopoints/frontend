<script>
  import { createEventDispatcher } from 'svelte';
  import { Button } from 'attractions';
  import getNotificationContent from '@/constants/notification-content.js';
  import { formatTime } from '@/utils/date-time-format.js';

  export let notification;

  const dispatch = createEventDispatcher();
</script>

<li class="notification">
  <span class="content">
    {#each getNotificationContent(notification) as fragment}
      {#if typeof fragment === 'string'}
        {fragment}
      {:else if fragment.bold}
        <strong>{fragment.text}</strong>
      {:else}
        <a href="{fragment.url}" rel="prefetch">{fragment.text}</a>
      {/if}
    {/each}
  </span>
  <Button round title="Mark as read" class="mt" on:click={() => dispatch('read', notification)}>
    <svg src="images/icons/check.svg" class="icon" />
  </Button>
  <time datetime={notification.timestamp}>{formatTime(notification.timestamp)}</time>
</li>

<style src="../../../static/css/components/common/notification.scss"></style>
