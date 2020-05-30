<script>
  import { Headline, Subhead } from 'attractions';

  export let imageURL;
  export let headline;
  export let subhead;
</script>

<section class="tagline padded">
  <img src={imageURL} class="hide-tb picture" alt="" />
  <div>
    <Headline>{headline}</Headline>
    <Subhead>
      <p>{subhead}</p>
      <slot />
    </Subhead>
  </div>
</section>

<style src="../../../static/css/components/tagline.scss"></style>
