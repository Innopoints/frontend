<template>
  <header class="top-level padded">
    <nuxt-link to="/" class="logo">
      <img src="/images/innou-icon.svg" alt="Go to the home page" />
      <span class="hide-tb">Innopoints</span>
    </nuxt-link>
    <div class="actions">
      <Button
        v-if="isAuth"
        link
        href="/profile"
        img="/images/icons/user.svg"
        round
        outline
      />
      <Button
        v-else
        @click="toggleAuth"
        label="sign in"
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
      isAuth: state => state.user.isAuth,
    }),
    methods: {
      resolution: (e) => {
        e.preventDefault();
        alert(`You current browser screen resolution.
        Width: ${window.innerWidth}px, height: ${window.innerHeight}px`);
      },
      ...mapActions({toggleAuth: 'user/toggleAuth'}),
    },
  };
</script>
