<script>
  import Dropdown from 'ui/dropdown.svelte';
  import Button from 'ui/button.svelte';

  export let classname = 'autocomplete-field';
  export let value = [];
  export let options = [];

  let open = false;
  let focus = false;
  let search = '';

  const choose = option => {
    let index = value.indexOf(option);
    if (index === -1) value = [...value, option];
    search = '';
  };
  const remove = option => value = value.filter(x => x !== option);
</script>

<div class:focus={focus} class={classname}>
  {#each value as option (option)}
    <div class="chip">
      {option}
      <Button isNormal isRound on:click={() => remove(option)}>
        <svg src="/images/icons/x.svg" class="icon" />
      </Button>
    </div>
  {/each}
  <Dropdown bind:value={open} classname="dropdown-shell open" nowrap>
    <input
      slot="handle"
      bind:value={search}
      on:focus={() => focus = true}
      on:blur={() => focus = false}
      on:input={() => open = true}
    />
    {#each options.slice(0, 5) as option (option)}
      {#if value.indexOf(option) === -1}
        <li on:click={() => choose(option)}>{option}</li>
      {/if}
    {/each}
  </Dropdown>
</div>
