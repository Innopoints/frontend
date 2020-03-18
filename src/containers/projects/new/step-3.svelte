<script>
  import StepHeader from '@/components/projects/new/step-header.svelte';
  import BottomNavigation from '@/components/projects/new/bottom-navigation.svelte';
  import Autocomplete from 'ui/autocomplete.svelte';
  import generateQueryString from '@/utils/generate-query-string.js';
  import * as api from '@/utils/api.js';

  export let project;
  export let autosaved;

  function userToAutocompleteValue(user) {
    return {
      name: user.full_name,
      details: user.email,
    };
  }

  function notCreator(moderator) {
    return moderator.email !== $project.creator;
  }

  const values = $project.moderators.filter(notCreator).map(userToAutocompleteValue);

  function recordChanges() {
    $project.moderators = values.map(user => ({
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
</script>

<form>
  <StepHeader step={3} {autosaved} subtitle="Step 3. Assign moderators for the project" />
  <p>
    Moderators can process applications from volunteers and edit activities.
    Feedback on volunteers is also shared between all moderators.
  </p>
  <p>
    This step is <strong>optional</strong>.
  </p>
  <p>
    You are the creator, therefore, also a moderator.
  </p>
  <span class="label">Search for people</span>
  <Autocomplete selection={values} getOptions={getUsers} on:change={recordChanges} />
  <BottomNavigation
    step={3}
    error={
      !($project.name && $project.organizer) ? 1 :
        ($project.activities.filter(act => !act.internal).length === 0 ? 2 : null)
    }
    on:publish
  />
</form>
