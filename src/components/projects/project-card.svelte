<script>
  import { Card, Button } from 'attractions';
  import Labeled from 'src/components/common/labeled.svelte';
  import { formatDateRange } from 'src/utils/date-time-format.js';
  import { API_HOST_BROWSER } from 'src/constants/env.js';

  export let id;
  export let name;
  export let image_id;
  export let creator;
  export let activities;
  $: exposedActivities = activities.filter(x => !x.internal && !x.draft);
  export let start_date;
  export let end_date;
  export let moderated = false;

  const imagePlaceholder = 'images/create-project/placeholder.svg';
</script>

<div class="project-card">
  <Card tight>
    <img
      loading="lazy"
      alt="Project cover"
      class="image"
      src={image_id == null ? imagePlaceholder : `${API_HOST_BROWSER}/file/${image_id}`}
    />
    <div class="content">
      <div class="title">{name}</div>
      <div class="compact">
        <Labeled icon label="When">
          <svg src="static/images/icons/calendar.svg" class="icon mr" slot="icon" />
          {formatDateRange({ start: start_date, end: end_date })}
        </Labeled>
        <Labeled icon label="Creator">
          <svg src="static/images/icons/user.svg" class="icon mr" slot="icon" />
          {creator.full_name}
        </Labeled>
      </div>
      <Labeled icon label="Activities">
        <svg src="static/images/icons/list.svg" class="icon mr" slot="icon" />
        <ul>
          {#each exposedActivities.slice(0, 3) as activity (activity.id)}
            <li>{activity.name}</li>
          {:else}
            <li>None</li>
          {/each}
          {#if exposedActivities.length > 3}
            <li class="extra">+ {exposedActivities.length - 3} more</li>
          {/if}
        </ul>
      </Labeled>
      <Button href="/projects/{id}" filled>
        {#if moderated}
          manage
        {:else}
          see details
        {/if}
      </Button>
    </div>
  </Card>
</div>

<style src="../../../static/css/components/projects/project-card.scss"></style>
