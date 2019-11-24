<script>
  import {get} from 'svelte/store';
  import TextField from 'ui/text-field.svelte';
  import Dropdown from 'ui/dropdown.svelte';
  import Dot from 'ui/dot.svelte';
  import Button from 'ui/button.svelte';
  import RadioGroup from 'ui/radio-group.svelte';
  import CheckboxGroup from 'ui/checkbox-group.svelte';

  import orders from '@/constants/store/order';
  import colors from '@/constants/store/colors';
  import {selectedOrder, selectOrder, filters, changeSearch, changeColors, changeIsColorless, changeLowPrice, changeHighPrice, clearAllFilters} from '@/store/store';
  import {isAuthed, user} from '@/store/user';

  const showAffordable = () => {
    let {balance} = get(user);
    if (balance) {
      changeLowPrice(0);
      changeHighPrice(balance);
    }
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
          name="order-options-mobile"
          value={$selectedOrder}
          items={orders}
          isLabel
          on:change="{(e) => selectOrder(e.detail)}"
      />
    </Dropdown>

    <Dropdown chevron={false} isRight>
      <svg slot="label" src="images/icons/filter.svg" class="mr" />
      <span slot="label">filters</span>
      <span slot="label">
        {#if !$filters.isEmpty}<Dot active small />{/if}
      </span>

      <Button isDanger on:click={clearAllFilters}>Clear filters</Button>
      <ul>
        <li class="filter price">
          <div>
            <span class="name">price</span>
            <div class="align-center">
              <TextField
                  type="number"
                  value={$filters.priceLow}
                  on:input={(e) => changeLowPrice(e.detail)}
                  on:change={(e) => changeLowPrice(e.detail)}
                  classname="no-spinner"
              />
              <span class="ml mr">–</span>
              <TextField
                  type="number"
                  value={$filters.priceHigh}
                  on:input={(e) => changeHighPrice(e.detail, true)}
                  on:change={(e) => changeHighPrice(e.detail, true)}
                  classname="no-spinner"
              />
            </div>
          </div>
          {#if $isAuthed}
            <Button on:click={showAffordable} classname="mt">
              <svg src="images/icons/tag.svg" class="icon mr" />
              show affordable
            </Button>
          {/if}
        </li>
        <li class="filter colors">
          <span class="name">colors</span>
          <CheckboxGroup
              colored
              name="colors"
              items={colors}
              classname="color-grid"
              value={$filters.colors}
              uniqueKey="color"
              on:change={(e) => changeColors(e.detail)}
          >
            <label class="clickable">
              <div class="checkbox">
                <input checked={$filters.isColorless} on:change={changeIsColorless} type="checkbox" name="colors">
                <div class="icon" />
              </div>
              colorless
            </label>
          </CheckboxGroup>
        </li>
      </ul>
    </Dropdown>
  </div>
</div>
