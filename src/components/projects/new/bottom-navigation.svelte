<script>
  import { getContext } from 'svelte';
  import { goto, stores } from '@sapper/app';
  import { Button } from 'attractions';
  import { snackbarContextKey } from 'attractions/snackbar';
  import * as api from 'src/utils/api.js';

  const { session } = stores();

  export let step;
  export let error = null;
  export let project = null;

  async function publishProject() {
    try {
      await api.json(api.patch(
        `/projects/${$project.id}/publish`,
        { csrfToken: $session.account.csrf_token },
      ));
      goto(`/projects/${$project.id}`);
    } catch (e) {
      showSnackbar({ props: { text: 'Couldn\'t publish the project, try reloading the page' } });
      console.error(e);
    }
  }

  const showSnackbar = getContext(snackbarContextKey);
</script>

<div class="actions padded">
  <p class="error">
    {#if error != null}
      {error}
    {/if}
  </p>
  {#if step > 1}
    <Button href="/projects/new?step={step - 1}" class="back">
      <svg src="images/icons/arrow-left.svg" class="mr" />
      go back
    </Button>
  {/if}
  {#if step > 0 && step < 3}
    <Button filled href="/projects/new?step={step + 1}" class="forward">
      <svg src="images/icons/arrow-right.svg" class="mr" />
      next step
    </Button>
  {:else if step === 3}
    <Button filled class="forward" disabled={error != null} on:click={publishProject}>
      create project
    </Button>
  {/if}
</div>

<style src="../../../../static/css/components/projects/new/bottom-navigation.scss"></style>
