<script>
  import { writeText } from 'clipboard-polyfill';

  export let text;
  let copied = false;

  async function copy() {
    try {
      await writeText(text);
      copied = true;
      setTimeout(() => copied = false, 1000);
    } catch (e) {
      console.error(e);
    }
  }
</script>

<button type="button" class="btn popover shadow-1" on:click={copy}>
  {#if copied}
    <svg class="icon mr" src="images/icons/check.svg" />
    copied
  {:else}
    <svg class="icon mr" src="images/icons/copy.svg" />
    copy
  {/if}
</button>
