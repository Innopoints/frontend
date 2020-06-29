<script>
  import { H1 } from 'attractions';
  export let error;

  const dev = process.env.NODE_ENV === 'development';
</script>

<div class="material padded">
  {#if dev}
    <H1>Alright, so here's what happened</H1>
    {#if error.stack}
      <pre>{error.stack}</pre>
    {/if}
  {:else}
    <div class="center">
      <H1>This is fine.</H1>
      <p class="flames">🔥🔥🔥</p>
      <p>Actually, it's not.</p>
      <p>
        You have just witnessed a fatal error, <br />
        please, get in touch with us at
        <a href="mailto:innopoints@innopolis.university">
        innopoints@innopolis.university
        </a>
      </p>
    </div>
  {/if}
</div>

<style src="../../../static/css/containers/errors/error-500.scss"></style>
