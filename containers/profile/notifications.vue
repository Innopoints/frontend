<template>
  <section class="settings padded">
    <header>
      <h2>Notification Settings</h2>
      You will still see notifications on the website even if you leave them off.
      <div class="dialog notice">
        <div class="message">
          <img src="/images/ui-kit/alert-triangle-green.svg" class="icon" />
          <p>Push notifications require permission before they can be used</p>
        </div>
        <div class="actions">
          <Button label="prompt for permissions" />
        </div>
      </div>
    </header>

    <ul>
      <ProfileNotification
        v-for="(notification, i) in notifications"
        :key="i"
        v-bind="notification"
      />
    </ul>
  </section>
</template>

<script>
  import notifications from '../../constants/profile/notifications';
  import Button from '../../components/ui/button';
  import ProfileNotification from '../../components/profile/notification';

  export default {
    name: 'ProfileNotifications',
    components: {
      ProfileNotification,
      Button,
    },
    data() {
      return {
        notifications,
      };
    },
  };
</script>
