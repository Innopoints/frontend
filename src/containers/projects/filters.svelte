<script>
  import TextField from 'ui/text-field.svelte';
  import Dropdown from 'ui/dropdown.svelte';
  import Dot from 'ui/dot.svelte';
  import Button from 'ui/button.svelte';
  import RadioGroup from 'ui/radio-group.svelte';
  import Spots from '@/components/projects/spots.svelte';

  import orders from '@/constants/projects/order';
  import {selectedOrder, selectOrder} from '@/store/projects';
</script>

<div class="filters">
  <TextField item>
    <svg src="images/icons/search.svg" class="item" />
  </TextField>
  <div class="dropdowns">
    <Dropdown chevron={false} wrapperclass="order-options">
      <svg slot="label" src="images/icons/order.svg" class="mr" />
      <span slot="label" class="tight">order</span>
      <span slot="label" class="regular">most expensive first</span>
      <RadioGroup
          selected={$selectedOrder}
          items={orders}
          isLabel
          on:change="{(e) => selectOrder(e.detail)}"
      />
    </Dropdown>

    <Dropdown chevron={false} right>
      <svg slot="label" src="images/icons/filter.svg" class="mr" />
      <span slot="label">filters</span>
      <span slot="label"><Dot active small /></span>
      <Button danger>Clear filters</Button>
      <ul class="accordion">
        <Spots />
      </ul>
    </Dropdown>
  </div>
</div>
