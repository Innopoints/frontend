<script>
  import TextField from 'ui/text-field.svelte';
  import Dropdown from 'ui/dropdown.svelte';
  import Dot from 'ui/dot.svelte';
  import Button from 'ui/button.svelte';
  import RadioGroup from 'ui/radio-group.svelte';
  // import CheckboxGroup from 'ui/checkbox-group.svelte';

  import orders from '@/constants/projects/order';
  // import competences from '@/constants/projects/competences';
  // import {selectedOrder, selectOrder, selectedCompetences, selectCompetences} from '@/store/projects';
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
      <!--<ul>
        <li class="filter price">
          <div>
            <span class="name">price</span>
            <div class="align-center">
              <TextField classname="no-spinner" type="number" />
              <span class="ml mr">–</span>
              <TextField classname="no-spinner" type="number" />
            </div>
          </div>
          {#if $isAuthed}
            <Button classname="mt">
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
              checked={$selectedColors}
              on:change={(e) => selectColors(e.detail)}
          >
            <label class="clickable">
              <div class="checkbox">
                <input checked={$isColorless} on:change={changeColorless} type="checkbox" name="colors">
                <div class="icon" />
              </div>
              colorless
            </label>
          </CheckboxGroup>
        </li>
      </ul>-->
    </Dropdown>
  </div>
</div>
