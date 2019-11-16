<script>
  import Card from 'ui/card.svelte';

  export let title = '';
  export let subtitle = '';
  export let img = '';
</script>

<Card>
  <img src={img} class="icon" alt="" />
  <span class="title">{title}</span>
  <span class="subtitle">{subtitle}</span>
</Card>
