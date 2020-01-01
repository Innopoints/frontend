<script>
  import Dropdown from 'ui/dropdown.svelte';
</script>

<Dropdown
 dropdownclass="dropdown notification-center"
 btnclass="btn round handle"
 chevron={false}
>
  <div slot="label" class="badge">
    <svg slot="label" src="/images/icons/bell.svg" class="icon" />
  </div>
  <div class="title">Notifications</div>
  <div class="empty">
    <svg src="/images/icons/bell-off.svg" class="icon" />
    <div class="title">No notifications</div>
  </div>
</Dropdown>
