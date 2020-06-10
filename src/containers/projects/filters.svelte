<script>
  import { createEventDispatcher } from 'svelte';
  import SearchBar from '@/components/common/search-bar.svelte';
  import { DropdownShell, Dropdown, RadioGroup, RadioChipGroup, Button } from 'attractions';

  export let orderOptions;
  export let selectedOrder;

  let filtering = {
    searchQuery: '',
    order: selectedOrder,
  };

  let searchDebounce = null;
  function changeSearch({ detail }) {
    filtering.searchQuery = detail.value;
    if (searchDebounce != null) {
      clearTimeout(searchDebounce);
    }
    searchDebounce = setTimeout(() => {
      searchDebounce = null;
      dispatch('change-filters', filtering);
    }, 500);
  }

  function changeOrder({ detail }) {
    filtering.order = orderOptions.find(option => option.value === detail.value);
    selectedOrder = filtering.order;
    dispatch('change-filters', filtering);
  }

  const dispatch = createEventDispatcher();
</script>

<div class="filters">
  <SearchBar on:input={changeSearch} value={filtering.searchQuery} />
  <div class="dropdowns">
    <DropdownShell let:toggle>
      <Button on:click={toggle} class="handle">
        <svg src="images/icons/order.svg" class="icon mr" />
        <span class="tight">order</span>
        <span class="regular">{selectedOrder.label}</span>
      </Button>
      <Dropdown>
        <div class="relative-wrapper order-options">
          <Button round neutral class="close" on:click={toggle}>
            <svg src="images/icons/x.svg" />
          </Button>
          <RadioGroup
            items={orderOptions}
            name="order-options-mobile"
            on:change={changeOrder}
            value={selectedOrder.value}
          />
        </div>
      </Dropdown>
    </DropdownShell>
  </div>
</div>
<RadioChipGroup
  items={orderOptions}
  name="order-options"
  on:change={changeOrder}
  value={selectedOrder.value}
  class="ordering hide-on-less-tb"
/>

<style src="../../../static/css/components/filters.scss"></style>
