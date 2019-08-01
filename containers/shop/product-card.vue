<template>
  <div class="card product with-image">
    <Button
      normal
      round
      class="close"
      img="/images/x.svg"
    />
    <Carousel :images="varieties[activeVariety].images" />
    <div class="content">
      <div class="title">{{ name }}</div>
      <div class="subtitle">{{ type }}</div>

      <div class="labeled text card-row">
        <span class="label">Description</span>
        <span>{{ description }}</span>
      </div>

      <div class="card-row">
        <div class="labeled text">
          <span class="label">Colors</span>
          <RadioGroup :items="varieties" :name="'color-' + id" class="radio-options" />
        </div>
        <Sizes />
      </div>

      <div class="card-row">
        <div class="labeled text">
          <span class="label">Price</span>
          <span class="price">
            {{ price }}
            <img src="/images/innopoint.svg" />
          </span>
        </div>
        <div class="purchase">
          <div class="purchases">{{ purchases }} purchases</div>
          <Button filled label="purchase" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Carousel from "../../components/ui/carousel";
  import Sizes from "../../components/shop/sizes";
  import RadioGroup from "../../components/ui/radio-group";
  import Button from '../../components/ui/button';

  export default {
    name: "ProductCard",
    components: {
      Button,
      Carousel,
      Sizes,
      RadioGroup,
    },
    props: {
      id: Number,
      name: String,
      type: String,
      description: String,
      price: Number,
      purchases: Number,
      varieties: Array,
    },
    data() {
      return {
        activeVariety: 0,
      };
    },
    methods: {
    },
  };
</script>

<style scoped>
  .close {
    position: absolute !important;
  }
</style>
