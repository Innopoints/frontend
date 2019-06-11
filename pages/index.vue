<template>
  <div>
    <LandingHeader />
    <LandingTagline />

    <!--  Place for the Features container  -->

    <!--  Place for the Process container  -->

    <Store />

    <LandingContacts />
    <LandingFooter />
  </div>
</template>

<script>
  import LandingHeader from '../components/landing/header';
  import LandingTagline from '../components/landing/tagline';
  import LandingContacts from '../components/landing/contacts';
  import LandingFooter from '../components/landing/footer';
  import Store from '../containers/store';

  export default {
    head: {
      title: 'Home',
      meta: [
        { hid: 'description', name: 'description', content: `Innopolis Unniversity's innopoints project` }
      ],
      link: [
        { rel: 'stylesheet', href: '/css/landing.css'}
      ]
    },
    components: {
      LandingHeader,
      LandingTagline,
      LandingContacts,
      LandingFooter,
      Store,
    }
  };
</script>

