<template>
  <Card :img="selected.images[0]" :color="selected.background">
    <template v-if="varieties.length > 1 && !isShort" v-slot:radio>
      <RadioGroup
        :items="varieties"
        :name="'color-' + id"
        v-model="selected"
        class="color-options"
      />
    </template>
    <div class="title">
      {{ name }}
    </div>
    <span class="subtitle">
      {{ type }}
    </span>
    <div v-if="!isShort" class="card-row">
      <div class="labeled text">
        <span class="label">Price</span>
        <span class="content">
          <span class="price">{{ price }}</span>
          <img src="/images/create-product/innopoint.svg" class="ml" />
        </span>
      </div>
      <Button
        :href="'/shop/' + id"
        label="view"
        link
        outline
      />
    </div>
    <Button
      v-else
      :href="'/shop/' + id"
      label="view"
      link
      outline
    />
  </Card>
</template>

<script>
  import Card from '../ui/card';
  import Button from '../ui/button';
  import RadioGroup from '../ui/radio-group';

  export default {
    name: 'StoreCard',
    components: { Button, Card, RadioGroup },
    props: {
      id: Number,
      name: String,
      type: String,
      price: Number,
      varieties: Array,
      isShort: Boolean,
    },
    data() {
      return {
        selected: this.varieties[0],
      };
    },
  };
</script>
