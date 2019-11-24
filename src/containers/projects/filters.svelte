<script>
  import TextField from 'ui/text-field.svelte';
  import Dropdown from 'ui/dropdown.svelte';
  import Dot from 'ui/dot.svelte';
  import Button from 'ui/button.svelte';
  import RadioGroup from 'ui/radio-group.svelte';

  import Spots from '@/components/projects/spots.svelte';
  import Competences from '@/components/projects/competences.svelte';
  import DateRange from '@/components/projects/date.svelte';

  import orders from '@/constants/projects/order';
  import {selectedOrder, selectOrder, filters, changeSearch, clearAllFilters} from '@/store/projects';

  let open = null;
  const changeOpen = (name) => {
    if (open !== name) open = name;
    else open = null;
  };
</script>

<div class="filters">
  <TextField
      value={$filters.search}
      on:change={(e) => changeSearch(e.detail)}
      on:input={(e) => changeSearch(e.detail)}
      isWithItem
  >
    <svg src="images/icons/search.svg" class="item" />
  </TextField>
  <div class="dropdowns">
    <Dropdown chevron={false} wrapperclass="relative-wrapper order-options">
      <svg slot="label" src="images/icons/order.svg" class="mr" />
      <span slot="label" class="tight">order</span>
      <span slot="label" class="regular">{$selectedOrder.label || $selectedOrder}</span>
      <RadioGroup
          value={$selectedOrder}
          items={orders}
          isLabel
          on:change="{(e) => selectOrder(e.detail)}"
      />
    </Dropdown>

    <Dropdown chevron={false} isRight>
      <svg slot="label" src="images/icons/filter.svg" class="mr" />
      <span slot="label">filters</span>
      <span slot="label">{#if !$filters.isEmpty}<Dot active small />{/if}</span>

      <Button isDanger on:click={clearAllFilters}>Clear filters</Button>
      <ul class="accordion">
        <Spots />
        <Competences open={open === 'competences'} on:toggle={() => changeOpen('competences')} />
        <DateRange open={open === 'date'} on:toggle={() => changeOpen('date')} />
      </ul>
    </Dropdown>
  </div>
</div>
