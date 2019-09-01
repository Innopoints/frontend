<template>
  <nav class="tabs">
    <label @click="$emit('change', 'T')" class="tab">
      <input
        type="radio"
        name="tabs"
        value="timeline"
        checked
      />
      <div v-ripple="'rgba(56, 120, 0, .25)'" class="icon">Timeline</div>
    </label>
    <label @click="$emit('change', 'S')" class="tab">
      <input type="radio" name="tabs" value="statistics" />
      <div v-ripple="'rgba(56, 120, 0, .25)'" class="icon">Statistics</div>
    </label>
    <label @click="$emit('change', 'N')" class="tab">
      <input type="radio" name="tabs" value="notifications" />
      <div v-ripple="'rgba(56, 120, 0, .25)'" class="icon">Notifications</div>
    </label>
  </nav>
</template>

<script>
  export default {
    name: 'ProfileTabs',
  };
</script>
