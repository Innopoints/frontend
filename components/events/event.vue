<template>
  <div class="card shadow-2">
    <img :src="img" />
    <h2>{{ title }}</h2>
    <div class="content">
      <div class="compact">
        <div class="detail">
          <img src="/images/events/calendar.svg" class="icon" />
          <div class="text">
            <h3>When</h3>
            <p>{{ date }}</p>
          </div>
        </div>

        <div class="detail">
          <img src="/images/events/user.svg" class="icon" />
          <div class="text">
            <h3>Organizer</h3>
            <p>{{ organizer }}</p>
          </div>
        </div>
      </div>

      <div class="detail">
        <img src="/images/events/list.svg" class="icon" />
        <div class="text">
          <h3>Activities</h3>
          <ul>
            <li v-for="activity in activities.slice(0, 3)" :key="activity">
              {{ activity }}
            </li>
            <li v-if="activities.length > 3" class="extra">+ {{ activities.length - 3 }} more</li>
          </ul>
        </div>
      </div>
      <a :href="url" class="btn filled green shadow-1">see details</a>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  export default Vue.extend({
    props: {
      img: String,
      title: String,
      date: String,
      organizer: String,
      activities: Array,
      url: String,
    },
  });
</script>
