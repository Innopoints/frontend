<script>
  import RadioChipGroup from 'ui/radio-chip-group.svelte';
  import orders from '@/constants/projects/order';
  import { selectedOrder } from '@/store/projects';
</script>

<RadioChipGroup
  values={orders}
  bind:value={$selectedOrder}
  name="order-options"
  classname="ordering hide-mb"
/>
