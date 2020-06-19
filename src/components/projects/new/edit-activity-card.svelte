<script>
  import { createEventDispatcher, getContext } from 'svelte';
  import { stores } from '@sapper/app';
  import {
    Button,
    Card,
    Checkbox,
    DatePicker,
    Dot,
    FormField,
    Switch,
    Tab,
    TextField,
    TimePicker,
  } from 'attractions';
  import { snackbarContextKey } from 'attractions/snackbar';
  import TwoStateSwitch from 'ui/two-state-switch.svelte';
  import CompetencePicker from './competence-picker.svelte';
  import ActivityQuestions from './activity-questions.svelte';
  import getBlankActivity from '@/constants/projects/blank-activity.js';
  import HOURLY_RATE from '@/constants/backend/default-hourly-rate.js';
  import {
    copyActivity,
    copyActivityInPlace,
    isComplete,
    prepareForBackend,
  } from '@/utils/project-manipulation.js';
  import spaceOnly from '@/utils/space-only.js';
  import arraysEqual from '@/utils/arrays-equal.js';
  import * as api from '@/utils/api.js';

  const { session } = stores();

  export let activity = getBlankActivity();
  let initialCopy = copyActivity(activity);
  let notDraft = !activity.draft;
  $: activity.draft = !notDraft;
  export let competences;

  const SECTION_GENERAL = 'General';
  const SECTION_VOLUNTEERS = 'Volunteers';
  const SECTION_MANAGEMENT = 'Management';
  let selectedSection = SECTION_GENERAL;

  let rememberedPeopleRequired = 0;
  function changeMoreBetterCheckbox({ detail }) {
    if (detail.checked) {
      rememberedPeopleRequired = activity.people_required;
      activity.people_required = null;
    } else {
      activity.people_required = rememberedPeopleRequired;
    }
  }

  function discardChanges() {
    activity = copyActivityInPlace(initialCopy, activity);
  }

  async function saveChanges() {
    if (activity.timeframe.start !== initialCopy.timeframe.start
        || activity.timeframe.end !== initialCopy.timeframe.end) {
      dispatch('dates-set', { value: activity.timeframe });
    }

    if (!arraysEqual(activity.feedback_questions, initialCopy.feedback_questions)) {
      dispatch('questions-set', { value: activity.feedback_questions });
    }

    try {
      await api.json(api.patch(
        `/projects/${activity.project}/activities/${activity.id}`,
        { data: prepareForBackend(activity), csrfToken: $session.account.csrf_token },
      ));
      activity._editing = false;
      dispatch('rerender');
    } catch (e) {
      showSnackbar({ props: { text: 'Couldn\'t save, try reloading the page.' } });
      console.error(e);
    }
  }

  const showSnackbar = getContext(snackbarContextKey);
  const dispatch = createEventDispatcher();
</script>

<div class="edit-activity">
  <Card class="create-activity">
    <nav>
      <Tab name="section" value={SECTION_GENERAL} bind:group={selectedSection}>
        {#if
          activity.name == null
          || spaceOnly(activity.name)
          || activity.timeframe == null
          || activity.timeframe.start == null
          || activity.timeframe.end == null
        }
          <Dot small info title="Some required fields are not filled out." class="mr" />
        {/if}
        {SECTION_GENERAL}
      </Tab>
      <Tab name="section" value={SECTION_VOLUNTEERS} bind:group={selectedSection}>
        {#if (
          (!activity.fixed_reward && activity.working_hours == null)
          || (activity.fixed_reward && activity.reward_rate == null))
        }
          <Dot small info title="Some required fields are not filled out." class="mr" />
        {/if}
        {SECTION_VOLUNTEERS}
      </Tab>
      <Tab name="section" value={SECTION_MANAGEMENT} bind:group={selectedSection} />
    </nav>
    <div class="fields">
      {#if selectedSection === SECTION_GENERAL}
        <FormField
          name="Activity name"
          required
          errors={[spaceOnly(activity.name) && 'The name cannot be empty.']}
        >
          <TextField bind:value={activity.name} autocomplete="off" maxlength={128} />
        </FormField>
        <FormField name="Description">
          <TextField multiline bind:value={activity.description} maxlength={1024} />
        </FormField>
        <FormField name="Activity dates" required>
          <DatePicker range top bind:value={activity.timeframe} />
        </FormField>
      {:else if selectedSection === SECTION_VOLUNTEERS}
        <FormField
          name="Competences"
          help="Select the competences that this activity develops (up&nbsp;to&nbsp;3)."
          required
        >
          <CompetencePicker {competences} bind:value={activity.competences} />
        </FormField>
        <FormField
          name="Reward type"
          help="Hourly rewards are typically granted for volunteering, while fixed rewards are for tasks like script writing and stage performances."
        >
          <TwoStateSwitch
            name="reward-type"
            first="hourly"
            second="fixed"
            bind:boolValue={activity.fixed_reward}
          />
        </FormField>
        {#if !activity.fixed_reward}
          <FormField
            name="Working hours"
            help="Preliminary, overworking can be accounted for later. Rewarded {HOURLY_RATE} ipts/hour."
            required
          >
            <div class="row">
              <TextField
                type="number"
                placeholder="1"
                min={1}
                max={99999}
                class="short"
                bind:value={activity.working_hours}
              />
              <span class="ml">hours</span>
            </div>
          </FormField>
        {:else}
          <FormField
            name="Reward amount"
            help="Make sure you get approval of this amount from Andrey of Student Affairs, otherwise your project may be rejected!"
            required
          >
            <TextField
              withItem
              itemRight
              type="number"
              min={1}
              max={99999}
              placeholder={HOURLY_RATE}
              bind:value={activity.reward_rate}
              class="short"
            >
              <svg src="images/innopoint-sharp.svg" class="innopoint item" />
            </TextField>
          </FormField>
        {/if}
      {:else if selectedSection === SECTION_MANAGEMENT}
        <FormField
          name="Telegram username required"
          help="With this option on, applicants will be prompted for their Telegram username."
          class="telegram-required"
        >
          <Switch bind:value={activity.telegram_required} class="ml" />
        </FormField>
        <FormField
          name="People required"
          required
        >
          <div class="row">
            <TextField
              type="number"
              min={0}
              max={99999}
              value={activity.people_required}
              on:change={({ detail }) => activity.people_required = detail.value}
              class="short"
            />
            <span class="ml">people</span>
          </div>
          <Checkbox
            name="the-more-the-better"
            value={true}
            checked={activity.people_required == null}
            on:change={changeMoreBetterCheckbox}
            class="mt"
          >
            <span class="ml">the more, the better</span>
          </Checkbox>
        </FormField>
        <FormField
          name="Application deadline"
          optional
        >
          <DatePicker bind:value={activity.application_deadline} />
          <TimePicker bind:value={activity.application_deadline} />
        </FormField>
        <FormField
          name="Feedback questions"
          help="Those will make up the feedback form for volunteers."
          optional
        >
          <ActivityQuestions bind:value={activity.feedback_questions} />
        </FormField>
      {/if}
    </div>
    <footer>
      {#if !isComplete(activity)}
        <div class="error">
          Fill out all required fields before making the activity visible to volunteers.
        </div>
      {/if}
      <div class="row">
        <svg src="images/icons/eye.svg" />
        <span>visible to volunteers</span>
        <Switch
          bind:value={notDraft}
          disabled={!isComplete(activity)}
        />
      </div>
      <div class="actions">
        <Button danger on:click={discardChanges}>discard changes</Button>
        <Button filled on:click={saveChanges}>
          save&nbsp;<span class="hide-on-less-tb">changes</span>
        </Button>
      </div>
    </footer>
  </Card>
</div>

<style src="../../../../static/css/components/projects/new/edit-activity-card.scss"></style>
