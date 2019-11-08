<script>
  import ChipGroup from 'ui/chip-group.svelte';
  import orders from '@/constants/projects/order';
  import {selectedOrder, selectOrder} from '@/store/projects';
</script>

<ChipGroup
    items={orders}
    value={$selectedOrder}
    name="order-options"
    on:change={(e) => selectOrder(e.detail)}
    classname="ordering hide-mb"
/>
