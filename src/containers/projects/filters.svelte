<script>
  import { createEventDispatcher } from 'svelte';
  import SearchBar from '@/components/common/search-bar.svelte';
  import TextField from 'ui/text-field.svelte';
  import Dropdown from 'ui/dropdown.svelte';
  import Dot from 'ui/dot.svelte';
  import Button from 'ui/button.svelte';
  import RadioGroup from 'ui/radio-group.svelte';
  import CheckboxGroup from 'ui/checkbox-group.svelte';
  import RadioChipGroup from 'ui/radio-chip-group.svelte';
  import Accordion from 'ui/accordion.svelte';
  import AccordionSection from 'ui/accordion-section.svelte';

  export let orderOptions;
  export let orderLabels;
  export let competences;
  export let order;
  export let orderLabel;
  const initialOrder = order;

  let filtering = {
    searchQuery: '',
    vacantSpots: null,
    excludedCompetences: [],
    minDate: null,
    maxDate: null,
    order: order,
  };
  $: filtersActive = ((filtering.vacantSpots != null)
                   || (filtering.excludedCompetences.length !== 0)
                   || (filtering.minDate != null)
                   || (filtering.maxDate != null));

  if (competences == null) competences = [];
  competences.forEach(compObject => { compObject.checked = true; });

  function clearCompetenceExclusion() {
    competences.forEach(compObject => { compObject.checked = true; });
    competences = competences;
  }

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

  function decrementSpots() {
    if (filtering.vacantSpots == null || filtering.vacantSpots <= 1) {
      filtering.vacantSpots = 1;
    } else {
      filtering.vacantSpots--;
    }
    dispatch('change-filters', filtering);
  }

  function changeSpots(event) {
    if (event.detail && !isNaN(+event.detail) && +event.detail > 1) {
      filtering.vacantSpots = event.detail;
      dispatch('change-filters', filtering);
    }
  }

  function incrementSpots() {
    if (filtering.vacantSpots == null || filtering.vacantSpots < 1) {
      filtering.vacantSpots = 1;
    } else {
      filtering.vacantSpots++;
    }
    dispatch('change-filters', filtering);
  }

  // function changeDates(event) {
  //   filtering.minDate = event.detail.left;
  //   filtering.maxDate = event.detail.right;
  //   dispatch('change-filters', filtering);
  // }

  function changeCompetences(item) {
    if (!item.checked) {
      filtering.excludedCompetences.push(item.id);
      filtering.excludedCompetences = filtering.excludedCompetences;
    } else {
      filtering.excludedCompetences = filtering.excludedCompetences.filter(x => x !== item.id);
    }
    dispatch('change-filters', filtering);
  }

  function clearFilters(event) {
    filtering.searchQuery = '';
    filtering.vacantSpots = null;
    filtering.minDate = null;
    filtering.maxDate = null;
    filtering.excludedCompetences = [];
    filtering.order = initialOrder;

    competences.forEach(compObject => { compObject.checked = true; });
    competences = competences;
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
        items={orderOptions.map(val => ({ value: val }))}
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
      <Accordion let:panelController={panelController}>
        <li class="filter spots">
          <div class="align-center">
            <svg src="images/icons/users.svg" class="icon mr" />
            <span class="name">vacant spots</span>
          </div>
          <div class="align-center">
            <Button isRound on:click={decrementSpots} disabled={filtering.vacantSpots === 1}>
              <svg src="images/icons/minus.svg" class="icon" />
            </Button>
            <TextField
              value={filtering.vacantSpots}
              type="number"
              min={1}
              isNoSpinner
              on:input={changeSpots}
            />
            <Button isRound on:click={incrementSpots}>
              <svg src="images/icons/plus.svg" class="icon" />
            </Button>
          </div>
        </li>
        <AccordionSection
          let:toggle={toggle}
          classname="filter competences"
          on:panel-open={panelController}
        >
          <div slot="handle" class="svelte-placeholder">
            <svg src="images/icons/tag.svg" class="icon mr" />
            <Button chevron on:click={toggle}>select competences</Button>
          </div>
          <Button on:click={clearCompetenceExclusion}>select all</Button>
          <CheckboxGroup
            labels={competences.map(compObject => compObject.name.toLowerCase())}
            items={competences}
            name="competences"
            on:change={(e) => changeCompetences(e.detail)}
          />
        </AccordionSection>
        <AccordionSection
          let:toggle={toggle}
          classname="filter date-range"
          on:panel-open={panelController}
        >
          <div slot="handle" class="svelte-placeholder">
            <svg src="images/icons/calendar.svg" class="icon mr" />
            <Button chevron on:click={toggle}>
              {#if filtering.minDate == null || filtering.maxDate == null}
                select date range
              {:else}
                to be filled in
              {/if}
            </Button>
          </div>
          someday we will add a date picker
        </AccordionSection>
      </Accordion>
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
