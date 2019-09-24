<script>
  import Button from 'ui/button.svelte';

  export let title = '';
  export let subtitle = '';
  export let img = '';
  export let buttonText = '';
  export let buttonLink = null;
  export let external = null;
</script>

<div class="container">
  <img src={img} class="picture" alt={title} />
  <div class="description">
    <span class="title">{title}</span>
    <span class="subtitle">{subtitle}</span>
    {#if buttonLink}
      <Button
        label={buttonText}
        away={external}
        href={buttonLink}
        img={external ? 'images/icons/external-link.svg' : ''}
        filled />
    {:else}
      <strong>{buttonText}</strong>
    {/if}
  </div>
</div>
