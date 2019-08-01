<template>
  <div id="view-product" class="modal-overlay column modal-open">
    <div class="balance-tooltip">
      You have 1337&nbsp;
      <img src="images/innopoint.svg" class="ml" />
    </div>

    <div class="card product with-image">
      <button id="close-modal" class="btn normal round close">
        <img src="images/x.svg" />
      </button>
      <Carousel :images="getImages()" />
      <div class="content">
        <div class="title">{{ item.name }}</div>
        <div class="subtitle">{{ item.type }}</div>

        <div class="labeled text card-row">
          <span class="label">Description</span>
          <span>{{ item.description }}</span>
        </div>

        <div class="card-row">
          <div class="labeled text">
            <span class="label">Colors</span>
            <RadioGroup :items="item.varieties" :name="'color-' + item.id" class="radio-options" />
          </div>
          <Sizes />
        </div>

        <div class="card-row">
          <div class="labeled text">
            <span class="label">Price</span>
            <span class="price">
              {{ item.price }}
              <img src="images/innopoint.svg" />
            </span>
          </div>
          <div class="purchase">
            <div class="purchases">1488 purchases</div>
            <a class="btn filled" href="#">purchase</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Carousel from "../../components/ui/carousel";
  import Sizes from "../../components/shop/sizes";
  import RadioGroup from "../../components/ui/radio-group";
  import items from "../../constants/store";

  export default {
    name: "ProductCard",
    components: {
      Carousel,
      Sizes,
      RadioGroup,
    },
    data() {
      return {
        item: items[0],
      };
    },
    methods: {
      getImages() {
        let images = [];
        this.item.varieties.filter(i => {
          images = images.concat(i.images);
        });
        return images;
      },
    },
  };
</script>
