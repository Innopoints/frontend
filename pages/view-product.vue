<template>
  <div class="material">
    <div class="align-center column">
      <a href="/shop" class="btn">
        <img src="images/shop/arrow-left.svg" class="mr" />
        see all products in the InnoStore
      </a>

      <div class="balance-tooltip">
        You have 1337&nbsp;
        <img src="images/innopoint.svg" class="ml" />
      </div>

      <div class="card product with-image">
        <button class="btn normal round close">
          <img src="images/x.svg" />
        </button>
        <Carousel :images="getImages()" />
        <div class="content">
          <div class="title">Write clean code</div>
          <div class="subtitle">sweatshirt</div>

          <div class="labeled text card-row">
            <span class="label">Description</span>
            <span>
              A cool comfortable sweatshirt. Comes in colors to fit your color needs.
              Comes in sizes to fit your size needs.
            </span>
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
                1337&nbsp;
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

      <p class="link-bottom padded">
        Lacking innopoints?
        <a href="events.html">Volunteer on events</a> to fill in the shortage!
      </p>
    </div>
  </div>
</template>

<script>
  import items from '../constants/store';
  import Carousel from '../components/ui/carousel';
  import Sizes from '../components/shop/sizes';
  import RadioGroup from '../components/ui/radio-group';

  export default {

    components: {
      Carousel,
      Sizes,
      RadioGroup,
    },
    data() {
      return {
        item: items[1],
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

<style lang="scss" src="../static/css/view-product/index.scss" />
