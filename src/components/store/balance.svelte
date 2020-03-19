<script>
  import s from '@/utils/plural-s.js';

  export let value = null;
</script>

{#if value != null}
  <div class="balance">
    You have {value}
    <svg src="images/innopoint-sharp.svg" alt="innopoint{s(value)}" />
  </div>
{/if}
