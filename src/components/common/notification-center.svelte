<script>
  import { onMount } from 'svelte';
  import { stores } from '@sapper/app';
  import Dropdown from 'ui/dropdown.svelte';
  import Button from 'ui/button.svelte';
  import * as api from '@/utils/api.js';
  import SimplebarList from 'ui/simplebar-list.svelte';
  import getNotificationContent from '@/constants/notification-content.js';
  import { formatTime } from '@/utils/date-time-format.js';

  const { session } = stores();

  $: unread = (
    $session.account != null
    && $session.account.notifications != null
    && $session.account.notifications.some(notification => !notification.is_read)
  );

  onMount(async () => {
    try {
      $session.account.notifications = await api.json(api.get('/notifications?unread'));
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
      $session.account.notifications = $session.account.notifications.filter(x => x.id !== id);
    } catch (e) {
      console.error(e);
    }
  }
</script>

<Dropdown
  dropdownclass="notification-center"
  handleclass="round"
  chevron={false}
  nowrap
  let:toggle={toggle}
>
  <div slot="label" class="badge" class:hidden={!unread}>
    <svg src="images/icons/bell.svg" class="icon" />
  </div>
  <Button isNormal isRound classname="close" on:click={toggle}>
    <svg src="images/icons/x.svg" class="icon" />
  </Button>
  <div class="title">Notifications</div>
  {#if $session.account == null || $session.account.notifications == null}
    <div class="empty small">
      <div class="icon">
        <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
      </div>
      <p>Loading...</p>
    </div>
  {:else if $session.account.notifications.length === 0}
    <div class="empty small">
      <div class="icon">
        <svg src="images/icons/bell-off.svg" />
      </div>
      <div class="title">No notifications</div>
    </div>
  {:else}
    <SimplebarList classname="notification-list">
      {#each $session.account.notifications as notification (notification.id)}
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
          <Button
            isRound
            tooltip="Mark as read"
            classname="mt"
            on:click={() => readNotification(notification.id)}
          >
            <svg src="images/icons/check.svg" class="icon" />
          </Button>
          <time datetime={notification.timestamp}>{formatTime(notification.timestamp)}</time>
        </li>
      {/each}
    </SimplebarList>
    <Button on:click={() => $session.account.notifications.forEach(x => readNotification(x.id))}>
      <svg src="images/icons/check.svg" class="icon mr" />
      mark all as read
    </Button>
  {/if}
</Dropdown>
