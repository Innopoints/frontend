<template>
  <header class="top-level padded">
    <span @click="resolution" class="logo">
      <img src="/images/events/innou-icon-green.svg" alt="Go to the home page" />
      <span class="hide-tb">Innopoints</span>
    </span>
    <div class="actions">
      <Button
        :label="'sign ' + (isAuth ? 'out' : 'in')"
        :click="toggleAuth"
        outline
      />
    </div>
  </header>
</template>

<script>
  import {mapState, mapActions} from 'vuex';
  import Button from './ui/button';

  export default {
    name: "Header",
    components: { Button },
    computed: mapState({
      isAuth: state => state.auth.isAuth
    }),
    methods: {
      resolution: (e) => {
        e.preventDefault();
        alert(`You current browser screen resolution.
        Width: ${window.innerWidth}px, height: ${window.innerHeight}px`);
      },
      ...mapActions({toggleAuth: 'auth/toggleAuth'}),
    }
  };
</script>
