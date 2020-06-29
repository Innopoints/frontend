<script>
  import { createEventDispatcher } from 'svelte';
  import { Button, TextField } from 'attractions';
  import { classes } from 'attractions/utils';

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
    const list = [];
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

  function goTo(page) {
    if (page >= 1 && page <= pages) {
      leftInputActive = false;
      rightInputActive = false;
      currentPage = page;
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

  const dispatch = createEventDispatcher();
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
            spinner={false}
            autofocus
            on:change={({ detail }) => goTo(detail.value)}
          />
        {:else}
          <Button class="page" neutral on:click={activateLeftInput}>...</Button>
        {/if}
      {:else if buttonValue === rightEllipsisKey}
        {#if rightInputActive}
          <TextField
            type="number"
            min={1}
            max={pages}
            spinner={false}
            autofocus
            on:change={({ detail }) => goTo(detail.value)}
          />
        {:else}
          <Button class="page" neutral on:click={activateRightInput}>...</Button>
        {/if}
      {:else}
        <Button
          neutral={buttonValue !== currentPage}
          class={classes('page', buttonValue === currentPage && 'current')}
          on:click={() => goTo(buttonValue)}
        >
          {buttonValue}
        </Button>
      {/if}
    {/each}
  </nav>
{/if}

<style lang="scss">
  @import "_attractions-theme.scss";

  .pagination {
    margin: 2em 1em;
    display: flex;
    align-items: center;
    justify-content: center;

    & > .page {
      width: 2.5em;
      height: 2.5em;
      margin: 0 .2em;
      justify-content: center;
      padding: 0;
      flex-shrink: 0;
    }

    & > :global(.text-field) {
      margin: 0 .2em;

      :global(input) {
        width: 2.8em !important;
        height: 2.8em !important;
      }
    }

    & > :global(.page.current) {
      background: transparentize($main, .95);

      &:hover {
        background: transparentize($main, .9);
      }

      &:focus {
        background: transparentize($main, .85);
      }
    }

    @media only screen and (min-width: 380px) {
      & > :global(.page),
      & > :global(.text-field) {
        margin: 0 .4em;
      }
    }

    @media only screen and (min-width: 540px) {
      width: 540px;
      align-self: center;

      & > :global(.page),
      :global(input) {
        font-size: 1.1rem;
      }
    }

    @media only screen and (min-width: 1024px) {
      & > :global(.page),
      :global(input) {
        font-size: 1.2rem;
      }
    }
  }
</style>
