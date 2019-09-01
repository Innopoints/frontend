<template>
  <header class="container">
    <img @click="resolution" src="/images/innou-logo.svg" class="logo" />
    <Button
      v-if="isAuth && isProfile"
      @click="signOut"
      label="sign out"
      outline
    />
    <Button
      v-else-if="isAuth"
      link
      href="/profile"
      img="/images/icons/user.svg"
      label="profile"
      outline
    />
    <Button
      v-else
      @click="toggleAuth"
      label="sign in"
      outline
    />
  </header>
</template>

<script>
  import {mapState, mapActions} from 'vuex';
  import Button from '../ui/button';

  export default {
    name: "LandingHeader",
    components: { Button },
    computed: {
      ...mapState({
        isAuth: state => state.user.isAuth,
      }),
      isProfile() {
        return this.$route.name === 'profile';
      },
    },
    methods: {
      resolution: () => {
        alert(`You current browser screen resolution.
        Width: ${window.innerWidth}px, height: ${window.innerHeight}px`);
      },
      ...mapActions({toggleAuth: 'user/toggleAuth'}),
      signOut() {
        this.toggleAuth();
        this.$router.push('/');
      },
    },
  };
</script>
