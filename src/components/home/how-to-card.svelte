<script>
  import Card from 'ui/card.svelte';

  export let title = '';
  export let subtitle = '';
  export let img = '';
</script>

<Card>
  <svg src={img} class="icon" />
  <span class="title">{title}</span>
  <span class="subtitle">{subtitle}</span>
</Card>
