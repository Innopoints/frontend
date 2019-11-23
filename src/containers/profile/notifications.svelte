<script>
  import {onMount} from 'svelte';
  import Button from 'ui/button.svelte';
  import RadioGroup from 'ui/radio-group.svelte';
  import notifications from '@/constants/profile/notifications';

  const items = ['Push', 'Off', 'e-mail'];

  const selected = {};
  onMount(() => {
    notifications.forEach(x => selected[x.name] = {});
  });

  const changeAll = (e) => {
    const item = e.detail;
    notifications.forEach(x => selected[x.name] = item);
  };

  const changeOne = (name, e) => {
    selected[name] = e.detail;
    selected.all = {};
  };
</script>

<div class="notifications">
  <header>
    <div class="dialog notice">
      <div class="message">
        <svg src="images/icons/alert-triangle.svg" class="icon" />
        <p>Push notifications require permission before they can be used.</p>
      </div>
      <div class="actions">
        <Button>prompt for permissions</Button>
      </div>
    </div>
  </header>

  <ul>
    {#each notifications as notification, i (notification.name)}
      <li class="section">
        <header>
          <div class="title">
            {notification.title}
          </div>
          {#if notification.subtitle}
            <div class="subtitle">{notification.subtitle}</div>
          {/if}
        </header>
        <RadioGroup
            classname="switches"
            name={notification.name}
            labelPosition="left"
            isLabel
            isLabelGreen
            items={items}
            value={selected[notification.name]}
            on:change="{(e) => {i === 0 ? changeAll(e) : changeOne(notification.name, e);}}"
        />
      </li>
    {/each}
  </ul>
</div>
