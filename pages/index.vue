<template>
  <div>
    <LandingHeader />
    <LandingTagline />

    <Feature />

    <Process />

    <Store />

    <LandingContacts />
  </div>
</template>

<script>
  import LandingHeader from '../components/landing/header';
  import LandingTagline from '../components/landing/tagline';
  import LandingContacts from '../components/landing/contacts';
  import Feature from '../containers/landing/feature';
  import Store from '../containers/landing/store';
  import Process from '../containers/landing/process';

  export default {
    layout: 'landing',
    head: {
      title: 'Home',
      meta: [
        { hid: 'description', name: 'description', content: `Innopolis Unniversity's innopoints project` }
      ]
    },
    components: {
      LandingHeader,
      LandingTagline,
      LandingContacts,
      Feature,
      Store,
      Process,
    }
  };
</script>

