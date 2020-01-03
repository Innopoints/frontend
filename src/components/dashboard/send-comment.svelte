<script>
  import TextField from 'ui/text-field.svelte';
  import Button from 'ui/button.svelte';
</script>

<div class="send-message">
  <header>
    <svg src="/images/icons/message-circle.svg" class="icon mr-2" />
    Send a message
  </header>
  <form>
    <TextField multiline cols="5" />
    <div class="actions">
      <Button>
        <svg src="/images/icons/send.svg" class="icon mr" />
        send
      </Button>
      <span class="status good" style="display: none;">success!</span>
      <span class="status bad" style="display: none;">failed, please, retry :(</span>
    </div>
  </form>
</div>
