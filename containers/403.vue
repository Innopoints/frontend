<template>
  <div class="material">
    <h1 class="padded title-403">{{ title }}</h1>
    <main class="padded container-403">
      <img src="/images/who-are-you.svg" class="picture" alt="" />
      <div class="card">
        <div class="title">What to do?</div>
        <div class="subtitle">It seems like you are not authorized to access this page.</div>
        <div class="actions">
          <Button
            @click="toggleAuth"
            filled
            label="sign in"
          />
          <Button
            outline
            link
            href="/"
            label="run to homepage"
          />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
  import {mapActions} from 'vuex';
  import Button from '../components/ui/button';

  export default {
    name: 'Error403',
    components: { Button },
    head() {
      return {
        title: this.title,
      };
    },
    computed: {
      title() {
        const names = {
          'product-edit': 'Create a product',
          'profile': 'Profile',
        };
        return names[this.$route.name];
      },
    },
    methods: {
      ...mapActions({toggleAuth: 'user/toggleAuth'}),
    },
  };
</script>
