<template>
  <header class="top-level padded">
    <nuxt-link to="/" class="logo">
      <img src="/images/innou-icon.svg" alt="Go to the home page" />
      <span class="hide-tb">Innopoints</span>
    </nuxt-link>
    <div class="actions">
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
    </div>
  </header>
</template>

<script>
  import {mapState, mapActions} from 'vuex';
  import Button from './ui/button';

  export default {
    name: "Header",
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
      resolution: (e) => {
        e.preventDefault();
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
