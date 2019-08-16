<template>
  <li class="filter spots">
    <div class="align-center">
      <img src="/images/icons/users.svg" />
      <span class="name">vacant spots</span>
    </div>

    <div class="align-center">
      <Button @click="spots--" round>
        <img src="/images/icons/minus.svg" />
      </Button>
      <TextField
        :min="0"
        v-model="spots"
        type="number"
        class="no-spinner"
      />
      <Button @click="spots++" round>
        <img src="/images/icons/plus.svg" />
      </Button>
    </div>
  </li>
</template>

<script>
  import TextField from '@/components/ui/text-field';
  import Button from '@/components/ui/button';

  export default {
    name: 'Spots',
    components: {
      TextField,
      Button,
    },
    computed: {
      spots: {
        get() {
          return this.$store.state.projects.filters.spots;
        },
        set(value) {
          this.$store.commit('projects/changeFilter', {type: 'spots', value});
        },
      },
    },
  };
</script>
