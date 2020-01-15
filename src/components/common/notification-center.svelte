<script>
  import { onMount } from 'svelte';
  import Dropdown from 'ui/dropdown.svelte';
  import Button from 'ui/button.svelte';
  import * as api from '@/utils/api.js';

  export let notifications = null;
  $: unread = notifications != null && notifications.some(notification => !notification.is_read);

  onMount(async () => {
    try {
      let resp = await api.get('/notifications');
      if (resp.status === 200) {
        notifications = await resp.json();
      }
    } catch (e) { console.error(e); }
  });
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
    <p>List notifications here</p>
  {/if}
</Dropdown>
