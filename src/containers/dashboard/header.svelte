<script>
  import Button from 'ui/button.svelte';
</script>

<h1 class="padded">
  Dashboard
  <Button isOutline href="/profile">
    <svg src="images/icons/user.svg" class="icon mr" />
    go to profile
  </Button>
</h1>

<style>
  h1 {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>
