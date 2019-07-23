<template>
  <Card id="chips">
    <h1>Chips</h1>
    
    <!-- <div
      v-for="(chips, i) in chipGroups"
      :key="i"
      class="showcase"
    >
      <div class="showcase">
        <div class="flex">
          <Chip v-for="(chip, j) in chips" v-bind="chip" :key="j" />
        </div>
      </div>
      <hr />
    </div> -->

    <div class="showcase">
      <div class="flex">
        <Chip disabled>most first</Chip>
        <Chip disabled>least first</Chip>
        <Chip disabled outline>least last</Chip>
        <Chip disabled outline>most last</Chip>
      </div>
    </div>
    <hr />

    <div class="showcase">
      <div class="flex">
        <Chip name="order">most first</Chip>
        <Chip name="order">least first</Chip>
        <Chip name="order">least last</Chip>
        <Chip name="order">most last</Chip>
      </div>
    </div>
    <hr />

    <div class="showcase">
      <div class="flex">
        <Chip small name="sizes1" disabled>XS</Chip>
        <Chip small name="sizes1">S</Chip>
        <Chip small name="sizes1">M</Chip>
        <Chip small name="sizes1">XXL</Chip>
      </div>
    </div>
    <hr />

    <div class="showcase">
      <div class="flex">
        <Chip outline name="sizes2">XS</Chip>
        <Chip outline name="sizes2">S</Chip>
        <Chip outline name="sizes2">M</Chip>
        <Chip outline name="sizes2">XXL</Chip>
      </div>
    </div>
    <hr />

    <div class="showcase">
      <div class="flex">
        <Chip multiple name="order2">most first</Chip>
        <Chip multiple name="order2">least first</Chip>
        <Chip multiple name="order2">least last</Chip>
        <Chip multiple name="order2">most last</Chip>
      </div>
    </div>
    <hr />

    <div class="showcase">
      <div class="flex">
        <Chip outline multiple name="sizes3">XS</Chip>
        <Chip outline multiple name="sizes3">S</Chip>
        <Chip outline multiple name="sizes3">M</Chip>
        <Chip outline multiple name="sizes3">XXL</Chip>
      </div>
    </div>
  </Card>
</template>

<script>
  import Card from '../../components/ui/card';
  import Chip from '../../components/ui/chip';

  export default {
    components: {
      Card,
      Chip,
    },
    data() {
      return {
        /* chipGroups: [
          [
            {text: 'most first', disabled: true},
            {text: 'least first', disabled: true},
            {text: 'least last', disabled: true, outline: true},
            {text: 'most last', disabled: true, outline: true},
          ],
          [
            {text: 'most first',  name: 'order1'},
            {text: 'least first', name: 'order1'},
            {text: 'least last',  name: 'order1'},
            {text: 'most last',   name: 'order1'},
          ],
          [
            {name: 'sizes1', small: true, text: 'XS', disabled: true},
            {name: 'sizes1', small: true, text: 'S'},
            {name: 'sizes1', small: true, text: 'M'},
            {name: 'sizes1', small: true, text: 'XXL'},
          ],
          [
            {name: 'sizes2', outline: true, text: 'XS'},
            {name: 'sizes2', outline: true, text: 'S'},
            {name: 'sizes2', outline: true, text: 'M'},
            {name: 'sizes2', outline: true, text: 'XXL'},
          ],
          [
            {text: 'most first',  name: 'order2', multiple: true},
            {text: 'least first', name: 'order2', multiple: true},
            {text: 'least last',  name: 'order2', multiple: true},
            {text: 'most last',   name: 'order2', multiple: true},
          ],
          [
            {name: 'sizes3', outline: true, multiple:true, text: 'XS'},
            {name: 'sizes3', outline: true, multiple:true, text: 'S'},
            {name: 'sizes3', outline: true, multiple:true, text: 'M'},
            {name: 'sizes3', outline: true, multiple:true, text: 'XXL'},
          ],
        ], */
      };
    },
  };
</script>

<style scoped>
.flex {
  display: flex;
  flex-wrap: wrap;
}
</style>
