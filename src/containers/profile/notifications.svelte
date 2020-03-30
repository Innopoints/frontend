<script>
  import { onMount } from 'svelte';
  import Button from 'ui/button.svelte';
  import Dialog from 'ui/dialog.svelte';
  import RadioGroup from 'ui/radio-group.svelte';
  import { categories, states } from '@/constants/profile/notification-settings.js';
  import * as api from '@/utils/api.js';
  import subscribeToPush from '@/utils/notifications-subscribe.js';

  export let notificationSettings;
  export let account;
  let notificationPermission = null;
  let initialSettings = Object.assign({}, notificationSettings);
  const supportsPush = 'PushManager' in window;
  $: changes = categories.some(
    category => (
      category.key != null
      && (category.key !== 'administration' && !account.is_admin)
      && notificationSettings[category.key] !== initialSettings[category.key]
    ),
  );

  let radioOptions = states.map(state => ({ value: state, disabled: state === 'push' }));

  function requestPermission() {
    // Crazy promise wrapper to handle both: old API that accepted a callback,
    //   and new API that returns a promise.
    new Promise(function(resolve, reject) {
      const promise = Notification.requestPermission(resolve);
      if (promise) {
        promise.then(resolve, reject);
      }
    }).then(updateNotificationPermission);
  }

  function updateRadioOptions() {
    if (notificationPermission !== 'granted') {
      return;
    }
    radioOptions.find(option => option.value === 'push').disabled = false;
    radioOptions = radioOptions;
  }

  async function updateNotificationPermission(permission) {
    notificationPermission = permission;
    if (notificationPermission !== 'granted') {
      return;
    }

    try {
      await subscribeToPush();
      updateRadioOptions();
    } catch (e) {
      console.error(e);
    }
  }

  onMount(() => {
    if (supportsPush) {
      notificationPermission = Notification.permission;
      updateRadioOptions();
    }
  });

  function updateSettings(key, value) {
    if (key == null) {
      categories.forEach(category => notificationSettings[category.key] = value);
    } else {
      notificationSettings[key] = value;
    }
  }

  function saveChanges() {
    delete notificationSettings[null];
    api.patch('/account/notification_settings', { data: notificationSettings })
      .then(() => changes = false)
      .catch(() => notificationSettings = initialSettings);
  }
</script>

<div class="notifications">
  {#if notificationPermission === 'default' || notificationPermission === 'denied'}
    <header>
      <Dialog isNotice>
        <div class="message" slot="content">
          <svg src="images/icons/alert-triangle.svg" class="icon" />
          <p>
            Push notifications require permission before they can be used.
            {#if notificationPermission === 'denied'}
              <br />
              To allow notifications after they've been blocked, check the website settings.
            {/if}
          </p>
        </div>
        <div class="actions" slot="content">
          {#if notificationPermission !== 'denied'}
            <Button on:click={requestPermission}>
              prompt for permissions
            </Button>
          {/if}
        </div>
      </Dialog>
    </header>
  {/if}

  <ul>
    {#each categories.filter(category => account.is_admin || category.key !== 'administration')
      as category (category.key)}
      <li class="section">
        <header>
          <div class="title">
            {category.title}
          </div>
          {#if category.subtitle}
            <div class="subtitle">{category.subtitle}</div>
          {/if}
        </header>
        <RadioGroup
          classname="switches"
          name={category.key || 'all'}
          labelPosition="left"
          labelclass="label"
          items={radioOptions}
          value={notificationSettings[category.key]}
          on:change={(evt) => updateSettings(category.key, evt.detail)}
        />
      </li>
    {/each}
    {#if changes}
      <div class="actions">
        <Button isFilled on:click={saveChanges}>save changes</Button>
      </div>
    {/if}
  </ul>
</div>
