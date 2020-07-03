<script>
  import { Button } from 'attractions';
  import Tagline from 'src/components/common/tagline.svelte';
  import { login } from 'src/utils/auth.js';

  export let account;

  const subhead = (
    'If you’re seeking an opportunity to contribute to the wonderful world of Innopolis projects, '
    + 'you’re in the right place!'
  );
</script>

<Tagline
  imageURL="/images/projects/voxel-volunteering.png"
  headline="Become a volunteer"
  {subhead}
>
  {#if account}
    <div class="actions">
      <Button outline rectangle href="/projects/new">
        <svg src="static/images/icons/plus.svg" class="mr" />
        create new project
      </Button>
    </div>
  {:else}
    <p class="signin-prompt">
      Got a fresh idea?
      <a href="/login" on:click|preventDefault={login}>Sign in</a>
      to create a project of your own.
    </p>
  {/if}
</Tagline>
