<script>
  import TextField from 'ui/text-field.svelte';
  import Button from 'ui/button.svelte';
</script>

<div class="operations">
  <div class="amend-balance">
    <header>
      <svg src="/images/icons/credit-card.svg" class="icon mr-2" />
      Add/subtract innopoints
    </header>
    <div class="subtitle">Supply a negative quantity to subtract innopoints.</div>
    <form>
      <TextField placeholder="0" type="number" isWithItem isItemRight>
        <svg src="/images/innopoint-sharp.svg" class="item innopoint" />
      </TextField>
      <Button isRound>
        <svg src="/images/icons/check.svg" class="icon" />
      </Button>
      <!--TODO: implement next two blocks-->
      <span class="status good" style="display: none;">success!</span>
      <span class="status bad" style="display: none;">failed, please, retry :(</span>
    </form>
  </div>

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

  <div class="see-profile">
    <header>
      <svg src="/images/icons/user.svg" class="icon mr-2" />
      See their profiles
    </header>
    <div class="subtitle">This will open new tabs.</div>
    <a href="/profile?user=some" target="_blank" class="btn">
      open profile
    </a>
  </div>
</div>
