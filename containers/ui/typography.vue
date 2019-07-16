<template>
  <Card>
    <h1>Typography</h1>
    <div class="showcase vertical">
      <span class="headline">Headline</span>
      <span class="subhead">
        Sub-headline text. Fly high, fly low, you know. <br />
        Look to the sky, up to the stars.
      </span>
      <hr />

      <h1>h1 Heading</h1>
      <h2>h2 Heading</h2>
      <h3>h3 Heading</h3>

      <hr />

      Regular text
      <strong>Bold text</strong>
      <span class="label">Label</span>
      <span class="label small">Small Label</span>
      <a href="/nowhere">Link</a>
      <a href="#">Visited</a>
    </div>
  </Card>
</template>
<script>
  import Card from '../../components/ui/card';

  export default {
    components: { Card }
  };
</script>
