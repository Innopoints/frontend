<script>
  import { PopoverButton } from 'attractions';
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

<PopoverButton on:click={copy}>
  {#if copied}
    <svg class="mr" src="static/images/icons/check.svg" />
    copied
  {:else}
    <svg class="mr" src="static/images/icons/copy.svg" />
    copy
  {/if}
</PopoverButton>
