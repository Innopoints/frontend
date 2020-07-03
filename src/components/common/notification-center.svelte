<script>
  import { onMount } from 'svelte';
  import { stores } from '@sapper/app';
  import { DropdownShell, Dropdown, Button, Loading, Badge } from 'attractions';
  import Notification from './notification.svelte';
  import EmptyState from './empty-state.svelte';
  import * as api from 'src/utils/api.js';

  const { session } = stores();

  $: unread = $session.notifications != null && $session.notifications.some(
    notification => !notification.is_read,
  );

  onMount(async () => {
    try {
      $session.notifications = await api.json(api.get('/notifications?unread'));
    } catch (e) {
      console.error(e);
    }
  });

  async function readNotification(id) {
    try {
      await api.json(api.patch(
        `/notifications/${id}/read`,
        { csrfToken: $session.account.csrf_token },
      ));
      $session.notifications = $session.notifications.filter(x => x.id !== id);
    } catch (e) {
      console.error(e);
    }
  }
</script>

<div class="notification-center">
  <DropdownShell let:toggle>
    <Button round on:click={toggle} class="mr">
      <Badge hidden={!unread}>
        <svg src="static/images/icons/bell.svg" class="icon" />
      </Badge>
    </Button>
    <Dropdown right>
      <Button neutral round class="close" on:click={toggle}>
        <svg src="static/images/icons/x.svg" class="icon" />
      </Button>
      <div class="title">Notifications</div>
      {#if $session.notifications == null}
        <EmptyState small text="Loading...">
          <Loading class="icon" />
        </EmptyState>
      {:else if $session.notifications.length === 0}
        <EmptyState small text="No notifications">
          <svg src="static/images/icons/bell-off.svg" class="icon" />
        </EmptyState>
      {:else}
        <ul class="notification-list">
          {#each $session.notifications as notification (notification.id)}
            <Notification {notification} on:read={() => readNotification(notification.id)} />
          {/each}
        </ul>
        <Button on:click={() => $session.notifications.forEach(x => readNotification(x.id))}>
          <svg src="static/images/icons/check.svg" class="icon mr" />
          mark all as read
        </Button>
      {/if}
    </Dropdown>
  </DropdownShell>
</div>

<style src="../../../static/css/components/common/notification-center.scss"></style>
