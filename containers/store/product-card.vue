<template>
  <div class="card product with-image">
    <Button
      v-if="closable"
      @click="closeModal"
      normal
      round
      class="close"
      img="/images/icons/x.svg"
    />
    <Carousel :images="activeVariety.images" :background="activeVariety.background" />
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

        <div class="labeled text">
          <span class="label">Sizes</span>
          <div role="group" class="radio-options">
            <Chip
              v-for="(val, key) in activeVariety.sizes"
              :disabled="val === 0"
              :value="key === chosenSize"
              :key="key"
              @input="chooseSize(key)"
              name="sizes"
              small
            >
              {{ key }}
            </Chip>
          </div>
        </div>
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
  import Carousel from "../../components/ui/carousel";
  import RadioGroup from "../../components/ui/radio-group";
  import Button from '../../components/ui/button';
  import Labeled from '../../components/ui/labeled';
  import Innopoint from '../../static/images/innopoint-sharp.svg';
  import Chip from '../../components/ui/chip';

  export default {
    name: "ProductCard",
    components: {
      Chip,
      Labeled,
      Button,
      Carousel,
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
      closable: Boolean,
      toggleModal: Function,
    },
    data() {
      return {
        activeVariety: this.varieties[0],
        chosenSize: null,
      };
    },
    watch: {
      activeVariety() {
        this.chosenSize = null;
      },
    },
    methods: {
      closeModal() {
        this.$router.push({name: 'store', query: {}});
      },
      chooseSize(size) {
        this.chosenSize = size;
      },
    },
  };
</script>

<style scoped>
  .close {
    position: absolute !important;
  }
</style>
