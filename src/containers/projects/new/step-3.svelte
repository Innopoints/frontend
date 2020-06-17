<script>
  import { getContext } from 'svelte';
  import StepHeader from '@/components/projects/new/step-header.svelte';
  import BottomNavigation from '@/components/projects/new/bottom-navigation.svelte';
  import { Autocomplete, Label, DropdownShell, Dropdown, Button } from 'attractions';
  import { snackbarContextKey } from 'attractions/snackbar';
  import spaceOnly from '@/utils/space-only.js';
  import * as api from '@/utils/api.js';

  export let project;
  export let autosaved;

  let value = $project.moderators.filter(notCreator).map(userToAutocompleteValue);
  const minSearchLength = 2;

  function userToAutocompleteValue(user) {
    return {
      name: user.full_name,
      details: user.email,
    };
  }

  function notCreator(moderator) {
    return moderator.email !== $project.creator.email;
  }

  function recordChanges() {
    $project.moderators = value.map(user => ({
      full_name: user.name,
      email: user.details,
    }));
  }

  async function *getUsers(query) {
    if (query.length < minSearchLength) {
      return [];
    }

    let pages, data;
    try {
      ({ pages, data } = await api.json(api.get('/accounts', { query: new Map([['q', query]]) })));
    } catch (e) {
      showSnackbar({ props: { text: 'Couldn\'t search for users, try reloading the page.' } });
      console.error(e);
      return [];
    }

    let currentPage = 1;
    if (currentPage >= pages) {
      return data.filter(notCreator).map(userToAutocompleteValue);
    }

    yield data.filter(notCreator).map(userToAutocompleteValue);


    while (currentPage <= pages) {
    const query = new Map([['q', query], ['page', currentPage]]);
      try {
        ({ pages, data } = await api.json(api.get('/accounts', { query })));
      } catch (e) {
        showSnackbar({ props: { text: 'Couldn\'t search for users, try reloading the page.' } });
        console.error(e);
        return [];
      }

      if (currentPage === pages) {
        return data.filter(notCreator).map(userToAutocompleteValue);
      } else {
        yield data.filter(notCreator).map(userToAutocompleteValue);
      }
      currentPage++;
    }
  }

  const showSnackbar = getContext(snackbarContextKey);
</script>

<div class="form">
  <StepHeader
    step={3}
    {autosaved}
    subtitle="Step 3. Assign additional moderators for the project"
  />
  <main class="padded">
    <div class="instructions">
      <p>This step is <strong>optional</strong>.</p>
      <DropdownShell let:toggle>
        <Button on:click={toggle}>
          <svg src="images/icons/help-circle.svg" class="mr" />
          who are moderators?
          <svg src="images/icons/chevron-down.svg" class="ml dropdown-chevron" />
        </Button>
        <Dropdown>
          <p>Moderators can process applications from volunteers and edit activities.</p>
          <p>Reports and ratings on volunteers are also shared between all moderators.</p>
          <p>You are a moderator, too, by the way, automatically.</p>
        </Dropdown>
      </DropdownShell>
    </div>

    <Label class="mb">Search for other people</Label>
    <Autocomplete
      bind:selection={value}
      getOptions={getUsers}
      placeholder="Start typing a name or an e-mail..."
      on:change={recordChanges}
      {minSearchLength}
    />
    <p>
      Can't find who you're looking for?
      Make sure they have logged into this website at least once.
    </p>
  </main>
  <BottomNavigation
    step={3}
    {project}
    error={
      $project.name == null
      || spaceOnly($project.name)
      || $project.activities.find(act => !act.draft && !act.internal) == null ?
        'Previous steps contain errors' : null
    }
  />
</div>

<style src="../../../../static/css/containers/projects/new/step-3.scss"></style>
