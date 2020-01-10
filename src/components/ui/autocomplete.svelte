<script>
  import Dropdown from 'ui/dropdown.svelte';
  import Button from 'ui/button.svelte';
  import itemAmount from 'ui/utils/item-amount.js';
  import callOnSight from 'ui/utils/call-on-sight.js';

  export let classname = '';
  export let chipclass = '';
  export let dropdownshellclass = '';
  export let listclass = '';
  export let itemclass = '';
  export let notenoughclass = '';
  export let toomanyclass = '';
  export let inputclass = '';
  export let loadingclass = '';
  export let loadbuttonclass = '';

  export let getOptions;
  export let values = [];
  export let minSearchLength = 3;
  export let maxOptions = null;

  export let markMatch = (match, string) => {
    if (match.length === 0) {
      return string;
    }

    const queryRegex = new RegExp(match, 'i');
    return string.replace(queryRegex, '<mark>$&</mark>');
  };

  let searchQuery = '';
  let optionGen;
  let promises = [];
  let hasMoreOptions;
  let selected = new Set(values.map(opt => opt.name));

  let dropdown;
  let input;

  let focus = false;

  function onInputFocus() {
    dropdown.toggle();
    focus = true;
  }

  function handleInput() {
    searchQuery = this.value;
    optionGen = getOptions(searchQuery);
    promises = [];
    promises.push(optionGen.next());
  }

  function checkDone(generatorValue) {
    hasMoreOptions = !generatorValue.done;
    let newOptions = generatorValue.value.filter(opt => !selected.has(opt.name));
    return newOptions;
  }

  function moreOptions(click) {
    promises.push(optionGen.next());
    promises = promises;

    if (click != null) {
      click.stopPropagation();
    }
  }

  function selectValue(option) {
    values.push(option);
    values = values;
    selected.add(option.name);
    promises = [];
    input.value = searchQuery = '';
    input.focus();
  }

  function deleteValue(option) {
    values = values.filter(x => x !== option);
    selected.delete(option.name);
  }
</script>

<style>
  .not-enough-input, .limit-reached {
    padding: 0 1em;
    font-size: .9rem;
    font-weight: 300;
  }
</style>

<div class:focus class="autocomplete-field {classname}">
  {#each values as loopValue (loopValue.name)}
    <div class="chip {chipclass}">
      {loopValue.name}
      <Button isNormal isRound on:click={() => deleteValue(loopValue)}>
        <svg src="/images/icons/x.svg" class="icon" />
      </Button>
    </div>
  {/each}
  <Dropdown
    bind:this={dropdown}
    bind:value={focus}
    classname="dropdown-shell {dropdownshellclass}"
    nowrap
  >
    <input
      slot="handle"
      on:input={handleInput}
      on:focus={onInputFocus}
      bind:this={input}
      class={inputclass}
    />
    {#if maxOptions !== null && values.length >= maxOptions}
      <p class="limit-reached {toomanyclass}">
        At most {itemAmount(maxOptions, 'option')} can be selected.
      </p>
    {:else if searchQuery.length < minSearchLength}
      {#if values.length === 0}
        <p class="not-enough-input {notenoughclass}">
          Type {itemAmount(minSearchLength, 'character')} to search
        </p>
      {/if}
    {:else}
      <ul class={listclass}>
        {#each promises as promise}
          {#await promise}
            <li class="loading {loadingclass}">
              <div class="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
              Loading...
            </li>
          {:then generatorValue}
            {#each checkDone(generatorValue) as option (option.name)}
              <li
                on:click={(click) => { click.stopPropagation(); selectValue(option); }}
                class={itemclass}
              >
                {@html markMatch(searchQuery, option.name)}
                {#if option.details}
                  <div class="subtext">
                    {@html markMatch(searchQuery, option.details)}
                  </div>
                {/if}
              </li>
            {/each}
          {/await}
        {/each}
        {#await Promise.all(promises) then _}
          {#if hasMoreOptions}
            <li
              class="load-more {loadbuttonclass}"
              on:click={moreOptions}
              use:callOnSight={{ callback: moreOptions }}
            >
              <svg src="images/icons/more-horizontal.svg" class="icon mr" />
              load more options
            </li>
          {/if}
        {/await}
      </ul>
    {/if}
  </Dropdown>
</div>
