<script>
  import { Button } from 'attractions';

  export let title;
  export let subtitle;
  export let imageURL = '';
  export let actionText = '';
  export let actionLink = null;
  export let external = null;
</script>

<div class="step">
  <div class="container">
    <img src={imageURL} class="picture" alt={title} />
    <div class="description">
      <span class="title">{title}</span>
      <span class="subtitle">{subtitle}</span>
      {#if actionLink != null}
        <Button href={actionLink} filled>
          {actionText}
          {#if external}
            <svg src="static/images/icons/external-link.svg" class="icon ml" />
          {/if}
        </Button>
      {:else}
        <strong>{actionText}</strong>
      {/if}
    </div>
  </div>
</div>

<style src="../../../static/css/components/home/option-step.scss"></style>
