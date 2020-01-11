<script>
  import Card from 'ui/card.svelte';
  import Labeled from 'ui/labeled.svelte';
  import Button from 'ui/button.svelte';
  import dateRange from '@/utils/date-range';

  export let id;
  export let title;
  export let status;
  export let organizer;
  export let activities;
  export let date;
  export let img;

  const eventDate = dateRange(date);
</script>

<Card {img} imgWrap={false}>
  <h2 class="title">{title}</h2>

  <div v-if="isAuth" class="compact">
    <Labeled icon="/images/icons/flag.svg" label="Status">{status}</Labeled>
  </div>

  <div class="compact">
    <Labeled icon label="When">
      <svg src="images/icons/calendar.svg" class="icon mr" slot="icon" />
      {eventDate}
    </Labeled>
    <Labeled icon label="Organizer">
      <svg src="images/icons/user.svg" class="icon mr" slot="icon" />
      {organizer}
    </Labeled>
  </div>

  <Labeled icon label="Activities">
    <svg src="images/icons/list.svg" class="icon mr" slot="icon" />
    <ul>
      {#each activities.slice(0, 3) as activity (activity.id)}
        <li>{activity.name}</li>
      {/each}
      {#if activities.length > 3}
        <li class="extra">+ {activities.length - 3} more</li>
      {/if}
    </ul>
  </Labeled>

  <Button href={'/projects/' + id} isFilled>see details</Button>
</Card>
