<script>
  import { Button, H1, Card } from 'attractions';
  import { login } from '@/utils/auth.js';

  export let message;
</script>


<div class="material">
  <H1 class="padded">{message}</H1>
  <main class="padded container-403">
    <img src="/images/who-are-you.svg" class="picture" alt="" />
    <Card>
      <div class="title">What to do?</div>
      <div class="subtitle">It seems like you are not authorized to access this page.</div>
      <div class="actions">
        <Button filled on:click={login}>sign in</Button>
        <Button outline href="/">run to homepage</Button>
      </div>
    </Card>
  </main>
</div>

<style src="../../../static/css/containers/errors/error-403.scss"></style>
