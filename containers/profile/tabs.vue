<template>
  <nav class="tabs">
    <label @click="$emit('change', 'T')" class="tab">
      <input
        type="radio"
        name="tabs"
        value="timeline"
        checked
      />
      <div class="icon">Timeline</div>
    </label>
    <label @click="$emit('change', 'S')" class="tab">
      <input type="radio" name="tabs" value="statistics" />
      <div class="icon">Statistics</div>
    </label>
    <label @click="$emit('change', 'N')" class="tab">
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
