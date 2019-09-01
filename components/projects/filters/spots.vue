<template>
  <li class="filter spots">
    <div class="align-center">
      <UsersIcon class="icon mr" />
      <span class="name">vacant spots</span>
    </div>

    <div class="align-center">
      <Button @click="spots--" round>
        <MinusIcon class="icon" />
      </Button>
      <TextField
        :min="0"
        v-model="spots"
        type="number"
        class="no-spinner"
      />
      <Button @click="spots++" round>
        <PlusIcon class="icon" />
      </Button>
    </div>
  </li>
</template>

<script>
  import TextField from '@/components/ui/text-field';
  import Button from '@/components/ui/button';
  import UsersIcon from '@/static/images/icons/users.svg';
  import MinusIcon from '@/static/images/icons/minus.svg';
  import PlusIcon from '@/static/images/icons/plus.svg';

  export default {
    name: 'Spots',
    components: {
      TextField,
      Button,
      UsersIcon,
      MinusIcon,
      PlusIcon,
    },
    computed: {
      spots: {
        get() {
          return this.$store.state.projects.filters.spots;
        },
        set(value) {
          if(value < 0)
            return;
          this.$store.commit('projects/changeFilter', {type: 'spots', value});
        },
      },
    },
  };
</script>
