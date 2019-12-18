<script>
  import Card from 'ui/card.svelte';
  import Button from 'ui/button.svelte';
  import Labeled from 'ui/labeled.svelte';
</script>

<Card classname="card activity">
  <svg src="/images/icons/drag-handle.svg" class="drag-handle" />
  <div class="title">Some Really Long Title that I would prefer not to have</div>
  <div class="parameters">
    <div class="labeled text">
      <div class="label">Reward</div>
      <div class="content">
        1000
        <svg src="/images/innopoint-sharp.svg" class="innopoint" />
      </div>
    </div>
    <Labeled label="People required">
      the more, the better
    </Labeled>
  </div>

  <div class="actions">
    <Button>
      <svg src="/images/icons/copy.svg" class="icon mr" />
      <span class="text">copy</span>
    </Button>
    <Button>
      <svg src="/images/icons/edit.svg" class="icon mr" />
      <span class="text">edit</span>
    </Button>
    <Button isDanger>
      <svg src="/images/icons/trash-2.svg" class="icon mr" />
      <span class="text">delete</span>
    </Button>
  </div>
</Card>
