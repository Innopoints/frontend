<template>
  <div :class="['activities', {'brief padded': !admin}]">

  </div>
</template>

<script>
  export default {
    name: 'ProjActivities',
    props: {
      admin: Boolean,
      activities: Array,
    },
  };
</script>
