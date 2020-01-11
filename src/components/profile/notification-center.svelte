<script>
  import Dropdown from 'ui/dropdown.svelte';
</script>

<style>
  :global(header.top-level .actions .dropdown-shell) {
    display: block;
  }
</style>
<Dropdown
 dropdownclass="dropdown notification-center"
 btnclass="btn round handle"
 chevron={false}
>
  <div slot="label" class="badge">
    <svg src="/images/icons/bell.svg" class="icon" />
  </div>
  <div class="title">Notifications</div>
  <div class="empty small">
    <svg src="/images/icons/bell-off.svg" class="icon" />
    <div class="title">No notifications</div>
  </div>
</Dropdown>
