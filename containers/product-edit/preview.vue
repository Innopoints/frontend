<template>
  <section class="preview">
    <h2>preview</h2>
    <Card></Card>
    <div class="actions">
      <Button danger label="clear fields" />
      <Button filled label="create product" />
    </div>
  </section>
</template>

<script>
  import Card from '../../components/ui/card';
  import Button from '../../components/ui/button';

  export default {
    name: 'ProductEditPreview',
    components: { Button, Card }
  };
</script>
