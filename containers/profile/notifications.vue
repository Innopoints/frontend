<template>
  <section class="notifications">
    <header>
      <div class="dialog notice">
        <div class="message">
          <Alert class="icon" />
          <p>Push notifications require permission before they can be used.</p>
        </div>
        <div class="actions">
          <Button label="prompt for permissions" />
        </div>
      </div>
    </header>

    <ul>
      <li class="section">
        <header>
          <div class="title">All notifications</div>
        </header>
        <ProfileRadioGroup @input="changeAll" name="all" />
      </li>

      <ProfileNotification
        v-for="item in notifications"
        :key="item.name"
        v-bind="item"
        :value="value"
      />
    </ul>
  </section>
</template>

<script>
  import Button from '@/components/ui/button';
  import ProfileNotification from '@/components/profile/notification';
  import Alert from '@/static/images/icons/alert-triangle.svg';
  import ProfileRadioGroup from '@/components/profile/radio-group';
  import notifications from '@/constants/profile/notifications';

  export default {
    name: 'ProfileNotifications',
    components: {
      ProfileNotification,
      ProfileRadioGroup,
      Button,
      Alert,
    },
    data() {
      return {
        value: {},
        notifications,
      };
    },
    methods: {
      changeAll(item) {
        this.value = item;
      },
    },
  };
</script>
