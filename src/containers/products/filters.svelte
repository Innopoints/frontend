<script>
  import { createEventDispatcher } from 'svelte';
  import SearchBar from '@/components/common/search-bar.svelte';
  import {
    Button,
    Checkbox,
    CheckboxGroup,
    Dot,
    Dropdown,
    DropdownShell,
    RadioChipGroup,
    RadioGroup,
    TextField,
  } from 'attractions';

  export let orderOptions;
  export let selectedOrder;
  export let colors = [];
  export let balance;
  const initialOrder = selectedOrder;

  let filtering = {
    searchQuery: '',
    minPrice: null,
    maxPrice: null,
    excludedColors: [],
    colorlessIncluded: true,
    order: initialOrder,
  };
  $: filtersActive = ((filtering.minPrice != null)
                   || (filtering.maxPrice != null)
                   || (filtering.excludedColors.length !== 0)
                   || (!filtering.colorlessIncluded));

  let colorItems = colors.map(colorObject => { colorObject.checked = true; return colorObject; });

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

  function changeMinPrice({ detail }) {
    filtering.minPrice = detail.value;
    dispatch('change-filters', filtering);
  }

  function changeMaxPrice({ detail }) {
    filtering.maxPrice = detail.value;
    dispatch('change-filters', filtering);
  }

  function changeColors({ detail }) {
    if (detail.checked) {
      filtering.excludedColors = filtering.excludedColors.filter(x => x !== detail.value);
    } else {
      filtering.excludedColors.push(detail.value);
      filtering.excludedColors = filtering.excludedColors;
    }
    dispatch('change-filters', filtering);
  }

  function clearFilters() {
    filtering = {
      searchQuery: '',
      minPrice: null,
      maxPrice: null,
      excludedColors: [],
      colorlessIncluded: true,
      order: initialOrder,
    };

    colorItems.forEach(colorObject => colorObject.checked = true);
    colorItems = colorItems;
    dispatch('change-filters', filtering);
  }

  function showAffordable() {
    changeMaxPrice({ detail: { value: balance } });
    changeMinPrice({ detail: { value: 0 } });
  }

  export function getLastFiltering() {
    return filtering;
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
    <DropdownShell let:toggle>
      <Button on:click={toggle} class="handle">
        <svg src="images/icons/filter.svg" class="icon mr" />
        filters
        {#if filtersActive}
          <Dot small class="ml" />
        {/if}
      </Button>
      <Dropdown right>
        <div class="relative-wrapper">
          <Button round neutral class="close" on:click={toggle}>
            <svg src="images/icons/x.svg" />
          </Button>
          <Button danger on:click={clearFilters}>clear filters</Button>
          <ul>
            <li class="filter price">
              <div>
                <span class="name">price</span>
                <div class="align-center">
                  <TextField
                    type="number"
                    spinner={false}
                    value={filtering.minPrice}
                    min={0}
                    max={filtering.maxPrice}
                    on:change={changeMinPrice}
                  />
                  <span class="ml mr">–</span>
                  <TextField
                    type="number"
                    spinner={false}
                    value={filtering.maxPrice}
                    min={filtering.minPrice || 0}
                    on:change={changeMaxPrice}
                  />
                </div>
              </div>
              {#if balance != null}
                <Button on:click={showAffordable} class="mt">
                  <svg src="images/icons/tag.svg" class="icon mr" />
                  show affordable
                </Button>
              {/if}
            </li>
            <li class="filter colors">
              <span class="name">colors</span>
              <div class="color-selection">
                <CheckboxGroup
                  color
                  round
                  name="colors"
                  items={colorItems}
                  class="color-grid"
                  on:change={changeColors}
                />
                <Checkbox
                  name="colors"
                  bind:checked={filtering.colorlessIncluded}
                  value={null}
                  on:change={() => dispatch('change-filters', filtering)}
                >
                  colorless
                </Checkbox>
              </div>
            </li>
          </ul>
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

<style src="../../../static/css/components/products/filters.scss"></style>
