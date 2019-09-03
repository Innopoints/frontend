<template>
  <li class="section">
    <header>
      <div class="title">{{ title }}</div>
      <div class="subtitle">{{ subtitle }}</div>
    </header>
    <ProfileRadioGroup :name="title" :value="value" />
  </li>
</template>

<script>
  import ProfileRadioGroup from './radio-group';

  export default {
    name: 'ProfileNotification',
    components: {
      ProfileRadioGroup,
    },
    props: {
      title: String,
      subtitle: String,
      value: Object,
    },
  };
</script>
