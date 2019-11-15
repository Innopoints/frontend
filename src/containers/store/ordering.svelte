<script>
  import ChipGroup from 'ui/chip-group.svelte';
  import orders from '@/constants/store/order';
  import {selectedOrder, selectOrder} from '@/store/store';
</script>

<ChipGroup
    items={orders}
    value={$selectedOrder}
    name="order-options"
    on:change={(e) => selectOrder(e.detail)}
    classname="ordering hide-mb"
/>
