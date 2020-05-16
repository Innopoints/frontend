<script>
  import { createEventDispatcher } from 'svelte';
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
  export let selection = [];
  export let minSearchLength = 3;
  export let maxOptions = null;

  function markMatch(match, string) {
    if (match.length === 0) {
      return [{ content: string, marked: false }];
    }

    const result = [];
    const partition = string.split(new RegExp(`(${match})`, 'ig'));
    for (let i = 0; i < partition.length; ++i) {
      result.push({ content: partition[i], marked: i % 2 !== 0 });
    }
    return result;
  }

  let searchQuery = '';
  let optionGen;
  let promises = [];
  let hasMoreOptions;
  let selected = new Set(selection.map(opt => opt.name));

  let dropdown;
  let input;

  let focus = false;

  const dispatch = createEventDispatcher();

  function onInputFocus() {
    dropdown.toggle();
    if (minSearchLength === 0) {
      handleInput(this.value);
    }
    focus = true;
  }

  function handleInput(passedValue) {
    searchQuery = (typeof passedValue === 'string' ? passedValue : this.value);
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
    selection.push(option);
    selection = selection;
    dispatch('change', selection);
    selected.add(option.name);
    promises = [];
    input.value = searchQuery = '';
    handleInput('');
    input.focus();
  }

  function deleteValue(option) {
    selection = selection.filter(x => x !== option);
    selected.delete(option.name);
    dispatch('change', selected);
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
  {#each selection as loopValue (loopValue.name)}
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
      {...$$restProps}
    />
    {#if maxOptions !== null && selection.length >= maxOptions}
      <p class="limit-reached {toomanyclass}">
        At most {itemAmount(maxOptions, 'option')} can be selected.
      </p>
    {:else if searchQuery.length < minSearchLength}
      {#if selection.length === 0}
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
                {#each markMatch(searchQuery, option.name) as part}
                  {#if part.marked}<mark>{part.content}</mark>{:else}{part.content}{/if}
                {/each}
                {#if option.details}
                  <div class="subtext">
                    {#each markMatch(searchQuery, option.details) as part}
                      {#if part.marked}<mark>{part.content}</mark>{:else}{part.content}{/if}
                    {/each}
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
