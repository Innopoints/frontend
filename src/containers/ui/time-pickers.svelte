<script>
  import Card from 'ui/card.svelte';
  import TimePicker from 'ui/time-picker.svelte';

  let time = null;
</script>

<Card id="time-pickers">
  <h1>Time Pickers</h1>
  <div class="mb">
    {#if time && time.hours != null && time.minutes != null}
      Selected time: {('' + time.hours).padStart(2, '0')}:{('' + time.minutes).padStart(2, '0')}
    {:else}
      No time selected
    {/if}
  </div>
  <TimePicker value={time} on:change={(e) => time = e.detail} />
</Card>
