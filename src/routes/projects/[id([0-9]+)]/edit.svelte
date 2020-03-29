<script context="module">
  import getInitialData from '@/utils/get-initial-data.js';

  export async function preload(page, session) {
    const { account, project } = await getInitialData(this, session, new Map([
      ['account', '/account?from_cache=true'],
      ['project', `/projects/${page.params.id}`],
    ]));
    if (account == null || (account.email !== project.creator && account.is_admin)) {
      this.error(403, 'Edit a Project');
    }
    return { account, project };
  }
</script>

<script>
  import { goto } from '@sapper/app';
  import Layout from '@/layouts/default.svelte';
  import ProjectImagePicker from '@/components/projects/new/project-image-picker.svelte';
  import FormField from 'ui/form-field.svelte';
  import Button from 'ui/button.svelte';
  import TextField from 'ui/text-field.svelte';
  import Autocomplete from 'ui/autocomplete.svelte';
  import generateQueryString from '@/utils/generate-query-string.js';
  import * as api from '@/utils/api.js';

  export let account;
  export let project;

  let duplicateName = false;

  function userToAutocompleteValue(user) {
    return {
      name: user.full_name,
      details: user.email,
    };
  }

  function notCreator(moderator) {
    return moderator.email !== project.creator;
  }

  project.moderators = project.moderators.filter(notCreator);
  let values = project.moderators.map(userToAutocompleteValue);

  function recordChanges() {
    project.moderators = values.map(user => ({
      full_name: user.name,
      email: user.details,
    }));
  }

  async function *getUsers(query) {
    if (query.length < 3) {
      return [];
    }

    const initialResp = await api.get(`/accounts?${generateQueryString(new Map([['q', query]]))}`);
    if (!initialResp.ok) {
      if (initialResp.status === 400) {
        console.error(await initialResp.json());
      } else {
        console.error(await initialResp.text());
      }
      return [];
    }

    let { pages, data } = await initialResp.json();
    let currentPage = 1;
    if (currentPage >= pages) {
      return data.filter(notCreator).map(userToAutocompleteValue);
    }

    yield data.filter(notCreator).map(userToAutocompleteValue);

    let resp;
    while (currentPage <= pages) {
      let queryString = generateQueryString(new Map([['q', query], ['page', currentPage]]));
      resp = await api.get(`/accounts?${queryString}`);
      if (!resp.ok) {
        if (resp.status === 400) {
          console.error(await resp.json());
        } else {
          console.error(await resp.text());
        }
        return [];
      }

      let { data, pages } = await resp.json();
      if (currentPage === pages) {
        return data.filter(notCreator).map(userToAutocompleteValue);
      } else {
        yield data.filter(notCreator).map(userToAutocompleteValue);
      }
      currentPage++;
    }
  }

  async function saveChanges() {
    try {
      await api.json(api.patch(`/projects/${project.id}`, {
        data: {
          name: project.name,
          image_id: project.image_id,
          organizer: project.organizer,
          moderators: project.moderators,
        },
      }));
      goto(`/projects/${project.id}`);
    } catch (e) {
      console.error(e);
    }
  }
</script>

<svelte:head>
  <title>Edit {project.name} – Innopoints</title>

  <link rel="stylesheet" href="/css/bundles/projects-id-edit.min.css" />
  <link rel="prefetch" as="style" href="/css/bundles/projects-id.min.css" />
  {#if account}
    {#if account.is_admin}
      <link rel="prefetch" as="style" href="/css/bundles/dashboard.min.css" />
    {:else}
      <link rel="prefetch" as="style" href="/css/bundles/profile.min.css" />
    {/if}
  {/if}
</svelte:head>

<Layout user={account}>
  <div class="material step1">
    <form class="padded">
      <h1>
        Edit {project.name}
      </h1>
      <FormField
        title="Project name"
        id="name"
        required
        error={
             (duplicateName && "The name must be unique.")
          || (project.name === '' && "The name must not be empty.")
          || null
        }
      >
        <span slot="subtitle" class="desc">
          <span class="lb">This has to be different from other projects.</span>
          <span class="lb">Adding the year to the name usually helps:</span><br>
          <em>“Halloween” → “Halloween 2019”</em>
        </span>
        <TextField
          id="title"
          value={project.name || ''}
          on:change={(event) => project.name = event.detail}
        />
      </FormField>

      <FormField
        title="Cover image"
        id="image"
        wrapperclass="image-picker"
      >
        <span slot="subtitle" class="desc">
          <span class="lb">This is shown on the project card to catch attention.</span>
          <span class="lb">Best to use 16:9 photos.</span>
        </span>
        <ProjectImagePicker bind:value={project.image_id} />
      </FormField>

      <FormField
        title="Organizer"
        id="organizer"
        required
        error={(project.organizer === '' && "The organizer field must not be empty.") || null}
      >
        <span slot="subtitle" class="desc">
          Name of the organizing department or individual.
        </span>
        <TextField
          id="organizer"
          value={project.organizer || ''}
          on:change={(event) => project.organizer = event.detail}
        />
      </FormField>

      <hr />

      <div class="step3">
        <p>
          Moderators can process applications from volunteers and edit activities.
          Feedback on volunteers is also shared between all moderators.
        </p>
        <p>
          You are the creator, therefore, also a moderator.
        </p>
        <div class="label">Search for people</div>
        <Autocomplete bind:selection={values} getOptions={getUsers} on:change={recordChanges} />
      </div>
      <div class="actions padded">
        <Button isDanger href="/projects/{project.id}">
          discard changes
        </Button>
        <Button isFilled on:click={saveChanges}>
          save changes
        </Button>
      </div>
    </form>
  </div>
</Layout>
