<script>
  import Card from 'ui/card.svelte';
  import Button from 'ui/button.svelte';

  export let title = '';
  export let subtitle = '';
</script>

<Card>
  <div class="title">{title || 'Untitled'}</div>
  <div class="subtitle">{subtitle}</div>
  <div class="actions">
    <Button isDanger>
      <svg src="/images/icons/trash-2.svg" class="mr"/>
      delete
    </Button>
    <Button href="/projects/new?step=1">
      <svg src="/images/icons/corner-down-right.svg" class="mr"/>
      continue
    </Button>
  </div>
</Card>
