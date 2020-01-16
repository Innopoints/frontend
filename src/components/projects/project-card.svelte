<script>
  import Card from 'ui/card.svelte';
  import Labeled from 'ui/labeled.svelte';
  import Button from 'ui/button.svelte';
  import formatDateRange from '@/utils/date-range.js';
  import { API_HOST } from '@/constants/env.js';

  export let id;
  export let name;
  export let image_url;
  export let organizer;
  export let activities;
  $: exposedActivities = activities.filter(x => !x.internal);
  export let start_date;
  export let end_date;
  export let moderated = false;
</script>

<Card classname="with-image">
  <img src={API_HOST + image_url} alt="" class="image" />
  <div class="content">
    <div class="title">{name}</div>
    <div class="compact">
      <Labeled icon label="When">
        <svg src="images/icons/calendar.svg" class="icon mr" slot="icon" />
        {formatDateRange({ start: start_date, end: end_date })}
      </Labeled>
      <Labeled icon label="Organizer">
        <svg src="images/icons/user.svg" class="icon mr" slot="icon" />
        {organizer}
      </Labeled>
    </div>
    <Labeled icon label="Activities">
      <svg src="images/icons/list.svg" class="icon mr" slot="icon" />
      <ul>
        {#each exposedActivities.slice(0, 3) as activity (activity.id)}
          <li>{activity.name}</li>
        {/each}
        {#if exposedActivities.length > 3}
          <li class="extra">+ {activities.length - 3} more</li>
        {/if}
      </ul>
    </Labeled>
    <Button href="/projects/{id}" isFilled>
      {#if moderated}
        manage
      {:else}
        see details
      {/if}
    </Button>
  </div>
</Card>
