<template>
  <Card :img="img">
    <template v-slot:radio>
      <div v-if="variations" class="image">
        <img
          v-if="img"
          :src="img"
          :style="'background: ' + color"
          class="image"
        />
        <RadioGroup :items="variations" name="title" class="color-options" />
      </div>
      <img
        v-else
        :src="img"
        :style="'background: ' + color"
        class="image"
      />
    </template>
    <div class="title">
      {{ title }}
    </div>
    <span class="subtitle">
      {{ subtitle }}
    </span>
    <div v-if="priced===true" class="card-row">
      <div class="labeled text">
        <span class="label">Price</span>
        <span class="content">
          <span class="price">{{ price }}</span>
          <img src="/images/create-product/innopoint.svg" class="ml" />
        </span>
      </div>
      <Button
        :href="buttonURL"
        label="view"
        outline
      />
    </div>
    <Button
      v-else
      :href="buttonURL"
      link
      label="view"
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
      img: String,
      title: String,
      subtitle: String,
      color: String,
      price: Number,
      variations: Array,
      buttonURL: {
        type: String,
        default: '#',
      },
      priced: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      background() {
        return {
          '#A52222': '#FFF0F0',
          '#217E93': '#F5FDFF',
          '#7A7A7A': '#F6F6F6',
        }[this.color];
      },
    },
  };
</script>
