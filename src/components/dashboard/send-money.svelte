<script>
  import TextField from 'ui/text-field.svelte';
  import Button from 'ui/button.svelte';
</script>

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
