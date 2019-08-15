<template>
  <div class="material">
    <LandingHeader />
    <LandingTagline />

    <HowTo />

    <Process />

    <Store />

    <LandingContacts />
  </div>
</template>

<script>
  import LandingHeader from '../components/home/header';
  import LandingTagline from '../components/home/tagline';
  import LandingContacts from '../components/home/contacts';
  import HowTo from '../containers/home/how-to';
  import Store from '../containers/home/store';
  import Process from '../containers/home/options';

  export default {
    layout: 'landing',
    head: {
      title: 'Home',
      meta: [
        { hid: 'description', name: 'description', content: `Innopolis Unniversity's innopoints project` },
      ],
    },
    components: {
      LandingHeader,
      LandingTagline,
      LandingContacts,
      HowTo,
      Store,
      Process,
    },
  };
</script>

<style lang="scss" src="../static/css/home/index.scss" />
