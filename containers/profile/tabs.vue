<template>
  <nav class="tabs">
    <label @click="$emit('change', 'T')" v-ripple="'rgba(56, 120, 0, .25)'" class="tab">
      <input
        type="radio"
        name="tabs"
        value="timeline"
        checked
      />
      <div class="icon">Timeline</div>
    </label>
    <label @click="$emit('change', 'S')" v-ripple="'rgba(56, 120, 0, .25)'" class="tab">
      <input type="radio" name="tabs" value="statistics" />
      <div class="icon">Statistics</div>
    </label>
    <label @click="$emit('change', 'N')" v-ripple="'rgba(56, 120, 0, .25)'" class="tab">
      <input type="radio" name="tabs" value="notifications" />
      <div class="icon">Notifications</div>
    </label>
  </nav>
</template>

<script>
  export default {
    name: 'ProfileTabs',
  };
</script>
