<template>
  <li class="filter spots">
    <div class="align-center">
      <img src="/images/events/users.svg" />
      <span class="name">vacant spots</span>
    </div>

    <div class="align-center">
      <Button @click="spots--" round>
        <img src="/images/events/minus.svg" />
      </Button>
      <TextField
        type="number"
        class="no-spinner"
        :min="0"
        v-model="spots"
      />
      <Button @click="spots++" round>
        <img src="/images/events/plus.svg" />
      </Button>
    </div>
  </li>
</template>

<script>
  import TextField from '../../../components/ui/text-field';
  import Button from '../../../components/ui/button';

  export default {
    name: 'Spots',
    components: {
      TextField,
      Button,
    },
    computed: {
      spots: {
        get() {
          return this.$store.state.events.filters.spots;
        },
        set(value) {
          this.$store.commit('events/changeFilter', {type: 'spots', value});
        },
      },
    },
  };
</script>
