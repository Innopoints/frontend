<template>
  <div>
    <LandingHeader />
    <LandingTagline />

    <Feature />

    <!--  Place for the Process container  -->

    <!--  Place for the Store container  -->

    <LandingContacts />
    <LandingFooter />
  </div>
</template>

<script>
  import LandingHeader from '../components/landing/header';
  import LandingTagline from '../components/landing/tagline';
  import LandingContacts from '../components/landing/contacts';
  import LandingFooter from '../components/landing/footer';
  import Feature from '../containers/feature';

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
      Feature,
    }
  };
</script>

