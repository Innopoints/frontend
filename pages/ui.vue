<template>
  <div class="body-wrap">
    <ButtonsShowcase />
  </div>
</template>

<script>
  import ButtonsShowcase from '../containers/ui/buttons';

  export default {
    components: {
      ButtonsShowcase
    },
    head: {
      title: 'UI kit',
      meta: [
        { hid: 'description', name: 'description', content: `UI kit for innopoints project` }
      ]
    },
  };
</script>

<style src="../static/css/ui-page.css" />
