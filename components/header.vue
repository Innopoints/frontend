<template>
  <header class="default">
    <div class="container">
      <div @click="resolution" class="logo">
        <img src="/images/events/innou-icon-green.svg" />
        <span class="hide-mb">Innopoints</span>
      </div>
      <span
        @click="toggleAuth"
        v-ripple
        class="btn outline green mdc-button"
      >
        sign {{ isAuth ? 'out' : 'in' }}
      </span>
    </div>
  </header>
</template>

<script>
  import {mapState, mapActions} from 'vuex';

  export default {
    name: "Header",
    computed: mapState({
      isAuth: state => state.auth.isAuth
    }),
    methods: {
      resolution: () => {
        alert(`You current browser screen resolution.
        Width: ${window.innerWidth}px, height: ${window.innerHeight}px`);
      },
      ...mapActions({toggleAuth: 'auth/toggleAuth'}),
    }
  };
</script>
