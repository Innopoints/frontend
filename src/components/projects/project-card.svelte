<script>
  import Card from 'ui/card.svelte';
  import Labeled from 'ui/labeled.svelte';
  import Button from 'ui/button.svelte';
  import { formatDateRange } from '@/utils/date-time-format.js';
  import { API_HOST_BROWSER } from '@/constants/env.js';

  export let id;
  export let name;
  export let image_id;
  export let creator;
  export let activities;
  $: exposedActivities = activities.filter(x => !x.internal);
  export let start_date;
  export let end_date;
  export let moderated = false;

  const imagePlaceholder = '/images/create-project/placeholder.svg';
</script>

<Card classname="with-image">
  <img src={image_id == null ? imagePlaceholder : `${API_HOST_BROWSER}/file/${image_id}`} alt="" class="image" />
  <div class="content">
    <div class="title">{name}</div>
    <div class="compact">
      <Labeled icon label="When">
        <svg src="images/icons/calendar.svg" class="icon mr" slot="icon" />
        {formatDateRange({ start: start_date, end: end_date })}
      </Labeled>
      <Labeled icon label="Creator">
        <svg src="images/icons/user.svg" class="icon mr" slot="icon" />
        {creator.full_name}
      </Labeled>
    </div>
    <Labeled icon label="Activities">
      <svg src="images/icons/list.svg" class="icon mr" slot="icon" />
      <ul>
        {#each exposedActivities.slice(0, 3) as activity (activity.id)}
          <li>{activity.name}</li>
        {:else}
          None
        {/each}
        {#if exposedActivities.length > 3}
          <li class="extra">+ {exposedActivities.length - 3} more</li>
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
