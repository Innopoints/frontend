<script>
  import Card from 'ui/card.svelte';
  import DatePicker from 'ui/date-picker.svelte';

  let date = null;
  let dateRange = null;
</script>

<Card id="date-pickers">
  <h1>Date Pickers</h1>
  <div class="mb">
    {#if date != null}
      Selected date: {date.toDateString()}
    {:else}
      No date selected
    {/if}
  </div>
  <DatePicker bind:value={date} />
  <hr class="mt-2 mb-2" />
  <div class="mb">
    {#if dateRange != null}
      Selected range: <br />
      from {dateRange.start.toDateString()} <br />
      to {dateRange.end.toDateString()}
    {:else}
      No date range selected
    {/if}
  </div>
  <DatePicker range on:change={(e) => dateRange = e.detail} />
</Card>
