<script>
  import { Headline, Subhead } from 'attractions';

  export let imageURL;
  export let headline;
  export let subhead;
</script>

<section class="tagline padded">
  <img loading="lazy" src={imageURL} class="hide-on-less-tb picture" alt="" />
  <div>
    <Headline>{headline}</Headline>
    <Subhead>
      {subhead}
      <slot />
    </Subhead>
  </div>
</section>

<style src="../../../static/css/components/common/tagline.scss"></style>
