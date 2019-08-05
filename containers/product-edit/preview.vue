<template>
  <section class="preview">
    <h2>Preview</h2>
    <Card img="/images/create-product/placeholder.svg">
      <span :class="name ? 'title' : 'placeholder'" class="name">{{ name }}</span>
      <span v-show="type" class="type subtitle">{{ type }}</span>
      <Labelled v-show="description" label="Description">
        {{ description }}
      </Labelled>
      <div v-show="varietiesWithColor.length > 0" class="card-row top">
        <Labelled label="Colors">
          <RadioGroup
            :items="varietiesWithColor"
            v-model="selectedVariety"
            name="preview"
            horizontal
          />
        </Labelled>
        <Labelled v-if="selectedVariety" label="Sizes">
          <Chip
            v-for="(amount, size) in selectedVariety.sizes"
            :key="size"
            :disabled="amount <= 0"
            :text="size"
            name="previewSizes"
            class="size"
            small
          />
        </Labelled>
      </div>
      <div class="card-row">
        <div class="labeled text">
          <span class="label">Price</span>
          <span class="content">
            <span :class="{placeholder: price <= 0}" class="price">{{ price > 0 ? price : '' }}</span>
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
      <Button @click="$store.commit('newProduct/reset')" danger label="clear fields" />
      <Button filled label="create product" />
    </div>
  </section>
</template>

<script>
  import { mapState } from 'vuex';
  import Card from '../../components/ui/card';
  import Button from '../../components/ui/button';
  import Labelled from '../../components/ui/labeled';
  import RadioGroup from '../../components/ui/radio-group';
  import Chip from '../../components/ui/chip';

  export default {
    name: 'ProductEditPreview',
    components: {
      Button,
      Card,
      Labelled,
      RadioGroup,
      Chip,
    },
    data() {
      return {
        selectedVariety: null,
      };
    },
    computed: {
      ...mapState('newProduct', [
        'name',
        'price',
        'description',
        'type',
        'varieties',
      ]),
      varietiesWithColor() {
        return this.varieties.filter(v => v.color);
      },
    },
    
  };
</script>
