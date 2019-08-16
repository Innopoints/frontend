<template>
  <Card>
    <h1>Labeled element</h1>
    <div class="showcase vertical">
      <Labeled label="Label">Some text</Labeled>
      <Labeled label="Another label" icon="/images/icons/plus.svg">Some another text</Labeled>
    </div>
  </Card>
</template>
<script>
  import Card from '../../components/ui/card';
  import Labeled from '../../components/ui/labeled';

  export default {
    components: {
      Card,
      Labeled,
    },
  };
</script>
