<template>
  <Card :img="img">
    <h2 class="title">{{ title }}</h2>

    <div v-if="isAuth" class="compact">
      <Labeled icon="/images/icons/flag.svg" label="Status">
        {{ status }}
      </Labeled>
    </div>

    <div class="compact">
      <Labeled icon="/images/icons/calendar.svg" label="When">
        {{ eventDate }}
      </Labeled>
      <Labeled icon="/images/icons/user.svg" label="Organizer">
        {{ organizer }}
      </Labeled>
    </div>

    <Labeled icon="/images/icons/list.svg" label="Activities">
      <ul>
        <li v-for="activity in activities.slice(0, 3)" :key="activity">
          {{ activity }}
        </li>
        <li v-if="activities.length > 3" class="extra">+ {{ activities.length - 3 }} more</li>
      </ul>
    </Labeled>

    <Button
      :label="isAuth ? 'review' : 'see details'"
      :href="url"
      link
      filled
    />
  </Card>
</template>

<script>
  import {mapState} from 'vuex';
  import printDate from '../../utils/eventDate';
  import Labeled from '../ui/labeled';
  import Button from '../ui/button';
  import Card from '../ui/card';

  export default {
    components: { Button, Labeled, Card },
    props: {
      img: String,
      title: String,
      date: Object,
      organizer: String,
      activities: Array,
      url: String,
      status: {
        type: String,
        required: false,
      },
    },
    computed: {
      ...mapState({
        isAuth: state => state.user.isAuth,
      }),
      eventDate() {
        return printDate(this.date);
      },
    },
  };
</script>
