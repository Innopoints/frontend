<script>
  import { onMount } from 'svelte';
  import Dropdown from 'ui/dropdown.svelte';
  import Button from 'ui/button.svelte';
  import * as api from '@/utils/api.js';
  import SimplebarList from 'ui/simplebar-list.svelte';
  import getNotificationContent from '@/constants/notification-content.js';

  export let notifications = null;
  $: unread = notifications != null && notifications.some(notification => !notification.is_read);

  onMount(async () => {
    try {
      let resp = await api.get('/notifications?unread');
      if (resp.status === 200) {
        notifications = await resp.json();
      }
    } catch (e) { console.error(e); }
  });

  async function readNotification(id) {
    try {
      let resp = await api.patch(`/notifications/${id}/read`);
      if (resp.status === 204) {
        notifications = notifications.filter(x => x.id !== id);
      }
    } catch (e) { console.error(e); }
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
  {#if notifications == null}
    <div class="empty small">
      <div class="icon">
        <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
      </div>
      <p>Loading...</p>
    </div>
  {:else if notifications.length === 0}
    <div class="empty small">
      <div class="icon">
        <svg src="images/icons/bell-off.svg" />
      </div>
      <div class="title">No notifications</div>
    </div>
  {:else}
    <SimplebarList classname="notification-list">
      {#each notifications as notification (notification.id)}
        <li class="notification">
          <span class="content">
            {#each getNotificationContent(notification) as fragment}
              {#if typeof fragment === 'string'}
                {fragment}
              {:else if fragment.bold}
                <strong>{fragment.text}</strong>
              {:else}
                <a href="{fragment.url}" rel="prefetch">
                  {fragment.text}
                </a>
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
          <time datetime={notification.timestamp}>
            {new Date(notification.timestamp).toLocaleString('ru', {
              hour: '2-digit',
              minute: '2-digit',
              day: '2-digit',
              month: '2-digit',
            })}
          </time>
        </li>
      {/each}
    </SimplebarList>
    <Button on:click={() => notifications.forEach(x => readNotification(x.id))}>
      <svg src="images/icons/check.svg" class="icon mr" />
      mark all as read
    </Button>
  {/if}
</Dropdown>
