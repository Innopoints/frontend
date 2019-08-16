<template>
  <div class="ordering hide-mb">
    <Chip
      v-for="(option, i) in options"
      :key="i"
      :text="option"
      :value="selected === option"
      @input="select(option)"
      name="ordering"
    />
  </div>
</template>

<script>
  import Chip from '@/components/ui/chip';

  export default {
    name: 'Ordering',
    components: {
      Chip,
    },
    data() {
      return {
        options: [
          'most recent',
          'least recent',
          'most valuable',
          'least valuable',
        ],
        selected: '',
      };
    },
    methods: {
      select(option) {
        this.selected = option;
        this.$store.commit('projects/changeField', {type: 'orderBy', value: option});
      },
    },
  };
</script>
