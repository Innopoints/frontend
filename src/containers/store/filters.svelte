<script>
  import { createEventDispatcher } from 'svelte';
  import SearchBar from '@/components/common/search-bar.svelte';
  import TextField from 'ui/text-field.svelte';
  import Dropdown from 'ui/dropdown.svelte';
  import Dot from 'ui/dot.svelte';
  import Button from 'ui/button.svelte';
  import RadioGroup from 'ui/radio-group.svelte';
  import RadioChipGroup from 'ui/radio-chip-group.svelte';
  import CheckboxGroup from 'ui/checkbox-group.svelte';

  export let orderOptions;
  export let orderLabels;
  export let colors;
  export let order;
  export let orderLabel;
  export let balance;
  const initialOrder = order;

  let filtering = {
    searchQuery: '',
    minPrice: null,
    maxPrice: null,
    excludedColors: [],
    colorlessExcluded: false,
    order: order,
  };
  $: filtersActive = ((filtering.minPrice != null)
                   || (filtering.maxPrice != null)
                   || (filtering.excludedColors.length !== 0)
                   || (filtering.colorlessExcluded));

  if (colors == null) colors = [];
  colors.forEach(colorObject => { colorObject.checked = true; });
  let colorlessValues = [{ value: null, checked: !filtering.colorlessExcluded }];

  const dispatch = createEventDispatcher();

  let searchDebounce = null;
  function changeSearch(event) {
    filtering.searchQuery = event.detail;
    if (searchDebounce != null) {
      clearTimeout(searchDebounce);
    }
    searchDebounce = setTimeout(() => {
      searchDebounce = null;
      dispatch('change-filters', filtering);
    }, 500);
  }

  function changeOrder(event) {
    filtering.order = event.detail;
    orderLabel = orderLabels[orderOptions.indexOf(event.detail)];
    dispatch('change-filters', filtering);
  }

  function changeMinPrice(event) {
    filtering.minPrice = +event.detail;
    dispatch('change-filters', filtering);
  }

  function changeMaxPrice(event) {
    filtering.maxPrice = +event.detail;
    dispatch('change-filters', filtering);
  }

  function changeColors(item) {
    if (!item.checked) {
      filtering.excludedColors.push(item.value);
      filtering.excludedColors = filtering.excludedColors;
    } else {
      filtering.excludedColors = filtering.excludedColors.filter(x => x !== item.value);
    }
    dispatch('change-filters', filtering);
  }

  function changeColorless(item) {
    filtering.colorlessExcluded = !item.checked;
    dispatch('change-filters', filtering);
  }

  function clearFilters(event) {
    filtering.searchQuery = '';
    filtering.minPrice = null;
    filtering.maxPrice = null;
    filtering.excludedColors = [];
    filtering.colorlessExcluded = false;
    filtering.order = initialOrder;

    colors.forEach(colorObject => { colorObject.checked = true; });
    colors = colors;
    colorlessValues = [{ value: 'null', checked: !filtering.colorlessExcluded }];
    dispatch('change-filters', filtering);
  }

  export function getLastFiltering() {
    return filtering;
  }
</script>

<div class="filters">
  <SearchBar on:input={changeSearch} value={filtering.searchQuery} />
  <div class="dropdowns">
    <Dropdown chevron={false} wrapperclass="order-options">
      <svg slot="label" src="images/icons/order.svg" class="icon mr" />
      <span slot="label" class="tight">order</span>
      <span slot="label" class="regular">{orderLabel}</span>
      <RadioGroup
        values={orderOptions.map(val => ({ value: val }))}
        labels={orderLabels}
        name="order-options-mobile"
        bind:value={order}
        on:change="{changeOrder}"
      />
    </Dropdown>
    <Dropdown chevron={false} isRight>
      <svg slot="label" src="/images/icons/filter.svg" class="icon mr" />
      <span slot="label">filters</span>
      <span slot="label">
        {#if filtersActive}<Dot active small />{/if}
      </span>
      <Button isDanger on:click={clearFilters}>clear filters</Button>
      <ul>
        <li class="filter price">
          <div>
            <span class="name">price</span>
            <div class="align-center">
              <TextField
                type="number"
                isNoSpinner
                value={filtering.minPrice}
                min={0}
                max={filtering.maxPrice}
                on:input={changeMinPrice}
              />
              <span class="ml mr">–</span>
              <TextField
                type="number"
                isNoSpinner
                value={filtering.maxPrice}
                min={filtering.minPrice || 0}
                on:input={changeMaxPrice}
              />
            </div>
          </div>
          {#if balance != null}
            <Button on:click={() => changeMaxPrice({ detail: balance })} classname="mt">
              <svg src="images/icons/tag.svg" class="icon mr" />
              show affordable
            </Button>
          {/if}
        </li>
        <li class="filter colors">
          <span class="name">colors</span>
          <div class="color-selection">
            <CheckboxGroup
              isColor
              isRound
              name="colors"
              values={colors}
              classname="color-grid"
              on:change={(e) => changeColors(e.detail)}
            />
            <CheckboxGroup
              name="colorless"
              values={colorlessValues}
              labels={['colorless']}
              on:change={(e) => changeColorless(e.detail)}
            />
          </div>
        </li>
      </ul>
    </Dropdown>
  </div>
</div>
<RadioChipGroup
  items={orderOptions}
  labels={orderLabels}
  name="order-options"
  bind:value={order}
  classname="ordering hide-mb"
  on:change="{changeOrder}"
/>
