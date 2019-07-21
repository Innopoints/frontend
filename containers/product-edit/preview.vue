<template>
  <section class="preview">
    <h2>Preview</h2>
    <Card img="/images/create-product/placeholder.svg">
      <span class="name placeholder" />
      <div class="card-row">
        <div class="labeled text">
          <span class="label">Price</span>
          <span class="content">
            <span class="price placeholder" />
            <img src="/images/create-product/innopoint.svg" class="ml" />
          </span>
        </div>
        <div class="purchase">
          <span>1337 purchases</span>
          <button class="btn outline">purchase</button>
        </div>
      </div>
    </Card>
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
