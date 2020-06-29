<script>
  import { onMount, getContext } from 'svelte';
  import { Button, RadioGroup } from 'attractions';
  import { snackbarContextKey } from 'attractions/snackbar';
  import Notice from 'src/components/common/notice.svelte';
  import { categories, states, permissions } from 'src/constants/profile/notification-settings.js';
  import subscribeToPush from 'src/utils/notifications-subscribe.js';
  import * as api from 'src/utils/api.js';

  export let notificationSettings;
  export let account;

  let notificationPermission = null;
  let initialSettings = Object.assign({}, notificationSettings);

  $: changes = categories.some(
    category => (
      category.key != null
      && (category.key !== 'administration' || account.is_admin)
      && notificationSettings[category.key] !== initialSettings[category.key]
    ),
  );

  let radioOptions = [...Object.values(states)].map(
    state => ({ value: state, disabled: state === states.PUSH }),
  );

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
    if (notificationPermission !== permissions.GRANTED) {
      return;
    }
    radioOptions.find(option => option.value === states.PUSH).disabled = false;
    radioOptions = radioOptions;
  }

  async function updateNotificationPermission(permission) {
    notificationPermission = permission;
    if (notificationPermission !== permissions.GRANTED) {
      return;
    }

    try {
      await subscribeToPush(account.csrf_token);
      updateRadioOptions();
    } catch (e) {
      console.error(e);
    }
  }

  onMount(() => {
    const supportsPush = 'PushManager' in window;
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

  async function saveChanges() {
    delete notificationSettings[null];
    try {
      await api.json(api.patch(
        '/account/notification_settings',
        { data: notificationSettings, csrfToken: account.csrf_token },
      ));
      changes = false;
      const undoPrompt = showSnackbar({
        props: {
          text: 'Settings updated successfully',
          action: {
            text: 'undo',
            async callback() {
              notificationSettings = Object.assign({}, initialSettings);
              await api.json(api.patch(
                '/account/notification_settings',
                { data: notificationSettings, csrfToken: account.csrf_token },
              ));
            },
          },
        },
      });

      if (await undoPrompt.expired) {
        initialSettings = Object.assign({}, notificationSettings);
      }
    } catch (e) {
      console.error(e);
      showSnackbar({ props: { text: 'Couldn\'t save changes, try reloading the page' } });
      notificationSettings = initialSettings;
    }
  }

  const showSnackbar = getContext(snackbarContextKey);
</script>

<div class="notifications">
  {#if notificationPermission === permissions.DEFAULT
    || notificationPermission === permissions.DENIED}
    <header>
      <Notice>
        <svg src="static/images/icons/alert-triangle.svg" class="icon" slot="icon" />
        <div class="message">
          <p>
            Push notifications require permission before they can be used.
            {#if notificationPermission === permissions.DENIED}
              <br />
              To allow notifications after they've been blocked, check the website settings.
            {/if}
          </p>
        </div>
        <div class="actions">
          {#if notificationPermission !== permissions.DENIED}
            <Button on:click={requestPermission}>
              prompt for permissions
            </Button>
          {/if}
        </div>
      </Notice>
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
          class="switches"
          name={category.key || 'all'}
          labelsLeft
          labelClass="label"
          items={radioOptions}
          value={notificationSettings[category.key]}
          on:change={(e) => updateSettings(category.key, e.detail.value)}
        />
      </li>
    {/each}
    {#if changes}
      <div class="actions">
        <Button filled on:click={saveChanges}>save changes</Button>
      </div>
    {/if}
  </ul>
</div>

<style src="../../../static/css/containers/profile/notifications.scss"></style>
