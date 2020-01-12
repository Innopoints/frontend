<script>
  export let value = null;
</script>

{#if value != null}
  <div class="balance">
    You have {value}
    <svg src="images/innopoint-sharp.svg" alt="innopoint{value !== 1 ? 's' : ''}" />
  </div>
{/if}
