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

    <hr />

    <h1>Text with a dot</h1>
    <div class="showcase vertical">
      <p>Simple dot<Dot /></p>
      <p>Simple green dot<Dot active /></p>
      <p>Attention small dot<Dot attention small /></p>
    </div>
  </Card>
</template>

<script>
  import Card from '../../components/ui/card';
  import Dot from '../../components/ui/dot';

  export default {
    components: { Dot, Card },
  };
</script>
