<template>
  <li class="filter colors">
    <span class="name">colors</span>
    <CheckboxGroup
      :value="colors"
      @change="toggle"
      class="color-grid"
      round
      colored
    />
  </li>
</template>

<script>
  import CheckboxGroup from '@/components/ui/checkbox-group';
  
  export default {
    components: {
      CheckboxGroup,
    },
    computed: {
      colors() {
        return this.$store.state.store.filters.colors;
      },
    },
    methods: {
      toggle({color}) {
        this.$store.commit('store/toggleColor', color);
      },
    },
  };
</script>