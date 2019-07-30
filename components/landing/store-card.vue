<template>
  <Card :img="img" :color="color">
    <div class="title">
      {{ title }}
    </div>
    <span class="subtitle">
      {{ subtitle }}
    </span>
    <div v-if="withPrice===true" class="card-row">
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

  export default {
    components: { Button, Card },
    props: {
      img: String,
      title: String,
      subtitle: String,
      color: String,
      price: Number,
      buttonURL: {
        type: String,
        default: '#'
      },
      withPrice: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      background() {
        return {
          '#A52222': '#FFF0F0',
          '#217E93': '#F5FDFF',
          '#7A7A7A': '#F6F6F6',
        }[this.color];
      }
    }
  };
</script>
