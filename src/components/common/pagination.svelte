<script>
  import { createEventDispatcher } from 'svelte';
  import Button from 'ui/button.svelte';
  import TextField from 'ui/text-field.svelte';

  export let pages;
  export let currentPage = 1;

  if (currentPage < 1 || currentPage > pages) {
    currentPage = 1;
  }

  let leftInputActive = false;
  let rightInputActive = false;

  const leftEllipsisKey = {};
  const rightEllipsisKey = {};

  function generateButtonList() {
    let list = [];
    if (currentPage !== 1) {
      list.push(1);
    }

    if (currentPage - 1 == 3) {
      list.push(currentPage - 2);
    } else if (currentPage - 1 > 3) {
      list.push(leftEllipsisKey);
    }

    if (currentPage > 2) {
      list.push(currentPage - 1);
    }

    list.push(currentPage);

    if (currentPage < pages - 1) {
      list.push(currentPage + 1);
    }

    if (pages - currentPage == 3) {
      list.push(currentPage + 2);
    } else if (pages - currentPage > 3) {
      list.push(rightEllipsisKey);
    }

    if (currentPage !== pages) {
      list.push(pages);
    }

    return list;
  }

  const dispatch = createEventDispatcher();
  function goTo(page) {
    if (page >= 1 && page <= pages) {
      leftInputActive = false;
      rightInputActive = false;
      dispatch('page-switch', page);
    }
  }

  function activateLeftInput() {
    leftInputActive = true;
    rightInputActive = false;
  }

  function activateRightInput() {
    leftInputActive = false;
    rightInputActive = true;
  }
</script>

{#if pages > 1}
  <nav class="pagination">
    {#each generateButtonList() as buttonValue (buttonValue)}
      {#if buttonValue === leftEllipsisKey}
        {#if leftInputActive}
          <TextField
            type="number"
            min={1}
            max={pages}
            isNoSpinner
            autofocus
            on:change={(evt) => goTo(+evt.detail)}
          />
        {:else}
          <Button classname="page" isNormal on:click={activateLeftInput}>...</Button>
        {/if}
      {:else if buttonValue === rightEllipsisKey}
        {#if rightInputActive}
          <TextField
            type="number"
            min={1}
            max={pages}
            isNoSpinner
            autofocus
            on:change={(evt) => goTo(+evt.detail)}
          />
        {:else}
          <Button classname="page" isNormal on:click={activateRightInput}>...</Button>
        {/if}
      {:else}
        <Button
          classname="page{buttonValue === currentPage ? ' current' : ''}"
          isNormal
          on:click={() => goTo(buttonValue)}
        >
          {buttonValue}
        </Button>
      {/if}
    {/each}
  </nav>
{/if}
