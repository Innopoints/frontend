<template>
  <div class="card product with-image">
    <Button
      @click="closeModal"
      normal
      round
      class="close"
      img="/images/x.svg"
    />
    <Carousel :images="activeVariety.images" />
    <div class="content">
      <div class="title">{{ name }}</div>
      <div class="subtitle">{{ type }}</div>

      <Labeled class="text card-row" label="Description">
        {{ description }}
      </Labeled>

      <div class="card-row">
        <Labeled class="text" label="Colors">
          <RadioGroup
            :items="varieties"
            :name="'color-' + id"
            v-model="activeVariety"
            class="radio-options"
          />
        </Labeled>
        <Sizes />
      </div>

      <div class="card-row">
        <Labeled label="Price">
          <span class="price">
            {{ price }}
            <Innopoint />
          </span>
        </Labeled>

        <div class="purchase">
          <div class="purchases">{{ purchases }} purchases</div>
          <Button filled label="purchase" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapActions} from 'vuex';
  import Carousel from "../../components/ui/carousel";
  import Sizes from "../../components/shop/sizes";
  import RadioGroup from "../../components/ui/radio-group";
  import Button from '../../components/ui/button';
  import Labeled from '../../components/ui/labeled';
  import Innopoint from '../../static/images/innopoint.svg';

  export default {
    name: "ProductCard",
    components: {
      Labeled,
      Button,
      Carousel,
      Sizes,
      RadioGroup,
      Innopoint,
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
        activeVariety: this.varieties[0],
      };
    },
    methods: {
      ...mapActions({
        toggleOpen: 'product/toggleOpen',
      }),
      closeModal() {
        this.$router.push({name: 'shop', query: {}});
        this.toggleOpen();
      },
    },
  };
</script>

<style scoped>
  .close {
    position: absolute !important;
  }
</style>
