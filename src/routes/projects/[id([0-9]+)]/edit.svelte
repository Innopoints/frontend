<script context="module">
  import { writable } from 'svelte/store';
  import getInitialData from 'src/utils/get-initial-data.js';
  import { prepareAfterBackend } from 'src/utils/project-manipulation.js';

  export async function preload(page, session) {
    const data = await getInitialData(this, session, new Map([
      ['project', `/projects/${page.params.id}`],
    ]));

    if (session.account == null
        || (session.account.email !== data.project.creator.email
            && !session.account.is_admin)) {
      this.error(403, 'Edit the Project');
    }

    data.project.activities.forEach(prepareAfterBackend);
    data.account = session.account;
    data.project = writable(data.project);
    return data;
  }
</script>

<script>
  import { getContext } from 'svelte';
  import { goto } from '@sapper/app';
  import {
    Autocomplete,
    Button,
    Divider,
    Dropdown,
    DropdownShell,
    FormField,
    H1,
    Label,
    TextField,
  } from 'attractions';
  import { snackbarContextKey } from 'attractions/snackbar';
  import ProjectImagePicker from 'src/components/projects/new/project-image-picker.svelte';
  import * as api from 'src/utils/api.js';
  import spaceOnly from 'src/utils/space-only.js';
  import {
    autocompleteValueToUser,
    getUsersRaw,
    minSearchLength,
    userToAutocompleteValue,
  } from 'src/utils/autocomplete-users.js';

  export let account;
  export let project;

  let moderatorsValue = $project.moderators.filter(notCreator).map(userToAutocompleteValue);

  export function notCreator(moderator) {
    return moderator.email !== account.email;
  }

  function recordChanges() {
    $project.moderators = moderatorsValue.map(autocompleteValueToUser);
  }

  async function* getUsers(query) {
    try {
      yield* getUsersRaw(query, notCreator);
    } catch (e) {
      showSnackbar({ props: { text: 'Couldn\'t search for users, try reloading the page' } });
      console.error(e);
      return [];
    }
  }

  async function saveChanges() {
    try {
      await api.json(api.patch(`/projects/${$project.id}`, {
        data: {
          name: $project.name,
          image_id: $project.image_id,
          moderators: $project.moderators,
        },
        csrfToken: account.csrf_token,
      }));
      goto(`/projects/${$project.id}`);
    } catch (e) {
      showSnackbar({ props: { text: 'Couldn\'t save the changes, try reloading the page' } });
      console.error(e);
    }
  }

  const showSnackbar = getContext(snackbarContextKey);
</script>

<svelte:head>
  <title>Edit {$project.name} – Innopoints</title>
</svelte:head>

<div class="material padded">
  <H1>Edit {$project.name}</H1>
  <FormField
    name="Project name"
    help="Prefer English names."
    required
    errors={[spaceOnly($project.name) && "The name must not be empty."]}
  >
    <TextField
      id="name"
      autocomplete="off"
      maxlength={128}
      bind:value={$project.name}
    />
  </FormField>

  <FormField
    name="Cover image"
    help="This is shown on the project card to catch attention."
  >
    <ProjectImagePicker bind:value={$project.image_id} />
  </FormField>

  <Divider />

  <div class="instructions">
    <p>This step is <strong>optional</strong>.</p>
    <DropdownShell let:toggle>
      <Button on:click={toggle}>
        <svg src="static/images/icons/help-circle.svg" class="mr" />
        who are moderators?
        <svg src="static/images/icons/chevron-down.svg" class="ml dropdown-chevron" />
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
    bind:selection={moderatorsValue}
    getOptions={getUsers}
    placeholder="Start typing a name or an e-mail..."
    on:change={recordChanges}
    {minSearchLength}
  />
  <p>
    Can't find who you're looking for?
    Make sure they have logged into this website at least once.
  </p>
  <div class="actions">
    <Button danger class="mr" href="/projects/{$project.id}">
      discard changes
    </Button>
    <Button filled on:click={saveChanges}>
      save changes
    </Button>
  </div>
</div>

<style src="../../../../static/css/routes/projects/view/edit.scss"></style>
