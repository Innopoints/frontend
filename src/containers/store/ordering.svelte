<script>
  import RadioChipGroup from 'ui/radio-chip-group.svelte';
  import orders from '@/constants/store/order';
  import { selectedOrder } from '@/store/store';
</script>

<RadioChipGroup
  values={orders}
  bind:value={$selectedOrder}
  name="order-options"
  classname="ordering hide-mb"
/>
