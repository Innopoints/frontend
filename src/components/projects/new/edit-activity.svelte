<script>
  import { createEventDispatcher } from 'svelte';
  import Button from 'ui/button.svelte';
  import Card from 'ui/card.svelte';
  import FormField from 'ui/form-field.svelte';
  import TextField from 'ui/text-field.svelte';
  import Dropdown from 'ui/dropdown.svelte';
  import DateTimePicker from 'ui/date-time-picker.svelte';
  import Switch from 'ui/switch.svelte';
  import TwoStateSwitch from 'ui/two-state-switch.svelte';
  import TimeframePicker from './timeframe-picker.svelte';
  import PeopleSelector from './people-selector.svelte';
  import CompetencePicker from './competence-picker.svelte';
  import ActivityQuestions from './activity-questions.svelte';
  import { formatTime } from '@/utils/date-time-format.js';
  import getBlankActivity from '@/constants/projects/blank-activity.js';
  import HOURLY_RATE from '@/constants/backend/default-hourly-rate.js';
  import { copyActivity } from '@/utils/project-manipulation.js';

  export let activity = getBlankActivity();
  let initialCopy = copyActivity(activity);

  export let competences;
  export let index;
  export let activityList;

  let fieldsAltered = false;
  const errors = {
    nameNotSpecified: false,
    nameReserved: false,
    dateNotSpecified: false,
    noCompetences: false,
    rewardRateNotSpecified: false,
    rewardRateInvalid: false,
    workingHoursNotSpecified: false,
    workingHoursInvalid: false,
    peopleRequiredNotSpecified: false,
    peopleRequiredInvalid: false,
  };

  function discardChanges() {
    activity = initialCopy;
    initialCopy = copyActivity(activity);
    fieldsAltered = false;
  }

  function cancelEdit() {
    if ('id' in activity) {
      dispatch('discard-changes', index);
    } else {
      dispatch('discard-activity', index);
    }
  }

  function ensureNameUniqueness() {
    for (let i = 0; i < activityList.length; ++i) {
      if (index !== i && activity.name === activityList[i].name) {
        return false;
      }
    }

    return true;
  }

  function validateAndSave() {
    if (!activity.name) {
      errors.nameNotSpecified = true;
    }

    if (activity.name === 'Moderation') {
      errors.nameReserved = true;
    }

    if (!activity.timeframe) {
      errors.dateNotSpecified = true;
    }

    if (activity.competences.length === 0) {
      errors.noCompetences = true;
    }

    if (activity.fixed_reward) {
      if (!activity.reward_rate) {
        errors.rewardRateNotSpecified = true;
      } else if (activity.reward_rate < 1) {
        errors.rewardRateInvalid = true;
      }
    } else {
      if (!activity.working_hours) {
        errors.workingHoursNotSpecified = true;
      } else if (activity.working_hours < 1) {
        errors.workingHoursInvalid = true;
      }
    }

    if (activity.people_required == null) {
      errors.peopleRequiredNotSpecified = true;
    }

    if (!ensureNameUniqueness()) {
      return;
    }

    if (!Object.keys(errors).some(errorName => errors[errorName])) {
      dispatch('change', activity);
      initialCopy = copyActivity(activity);
    }
  }

  const dispatch = createEventDispatcher();
</script>

<Card classname="create-activity">
  <div class="left">
    <FormField
      classname="name"
      id="activity-name{index}"
      title="Activity name"
      required
      error={
        (activity.name === '' && "The name must not be empty.")
        || (errors.nameNotSpecified && "The name must be specified.")
        || (errors.nameReserved && "This name is reserved for internal use.")
        || (!ensureNameUniqueness() && "The name should be unique.")
      }
    >
      <TextField
        id="activity-name{index}"
        bind:value={activity.name}
        autocomplete={false}
        maxlength={128}
        on:change={() => { errors.nameNotSpecified = false; fieldsAltered = true; }}
      />
    </FormField>

    <FormField
      classname="description"
      id="activity-description{index}"
      title="Description"
    >
      <TextField
        multiline
        id="activity-description{index}"
        bind:value={activity.description}
        maxlength={1024}
        on:change={() => fieldsAltered = true}
      />
    </FormField>

    <FormField
      classname="date-range"
      title="Activity date"
      error={errors.dateNotSpecified && "The activity date must be specified."}
    >
      <span slot="title" class="name">
        Activity date&nbsp;<span class="required">*</span>
      </span>
      <TimeframePicker
        bind:value={activity.timeframe}
        bind:errorNotSpecified={errors.dateNotSpecified}
        on:change={() => fieldsAltered = true}
      />
    </FormField>

    <FormField
      title="Competences developed by this activity (no more than 3)"
      classname="competences"
      error={errors.noCompetences && "At least one competence should be selected."}
    >
      <span slot="title" class="name">
        Competences, developed by this activity (no more than&nbsp;3)&nbsp;<span class="required">*</span>
      </span>
      <CompetencePicker
        {competences}
        activityIndex={index}
        bind:value={activity.competences}
        bind:errorNotSpecified={errors.noCompetences}
        on:change={() => fieldsAltered = true}
      />
    </FormField>

    <FormField
      title="Telegram username required"
      subtitle="With this option on, applicants will be prompted for their Telegram username."
      classname="tg-username"
      id="tg-username{index}"
    >
      <Switch
        bind:value={activity.telegram_required}
        on:change={() => fieldsAltered = true}
      />
    </FormField>
  </div>

  <div class="right">
    <FormField
      classname="reward-type"
      id="reward-type{index}"
      title="The reward is"
      wrapperclass="hinted"
    >
      <TwoStateSwitch
        first="hourly"
        second="fixed"
        bind:boolValue={activity.fixed_reward}
      />
      <Dropdown dropdownclass="info-bubble" handleclass="round" chevron={false} isRight>
        <svg slot="label" src="images/icons/help-circle.svg" class="icon" />
        Hourly rewards are typically granted for volunteering, while fixed rewards are
        for tasks like script writing and stage performances.
      </Dropdown>
    </FormField>

    {#if !activity.fixed_reward}
      <FormField
        classname="work-hours"
        id="work-hours{index}"
        title="Work hours"
        subtitle="Estimated time of work, rewarded {HOURLY_RATE} ipts/hour"
        error={
          (errors.workingHoursNotSpecified && "Working hours must be specified.")
          || (errors.workingHoursInvalid && "Must be positive.")
        }
        required
      >
        <TextField
          id="work-hours{index}"
          type="number"
          placeholder="1"
          min={1}
          max={99999}
          bind:value={activity.working_hours}
          on:change={(evt) => {
            errors.workingHoursNotSpecified = false;
            (+evt.detail >= 1) && (errors.workingHoursInvalid = false);
            fieldsAltered = true;
          }}
        />
      </FormField>
    {:else}
      <FormField
        classname="reward-amt"
        id="reward-amt-fixed{index}"
        wrapperclass="hinted"
      >
        <span slot="title" class="name">
          Innopoints awarded&nbsp;<span class="required">*</span>
        </span>
        <div class="text-field-wrapper">
          <TextField
            isWithItem
            isItemRight
            id="reward-amt-fixed{index}"
            type="number"
            min={1}
            max={99999}
            placeholder={HOURLY_RATE}
            bind:value={activity.reward_rate}
            on:change={(evt) => {
              errors.rewardRateNotSpecified = false;
              (+evt.detail >= 1) && (errors.rewardRateInvalid = false);
              fieldsAltered = true;
            }}
          >
            <svg src="images/innopoint-sharp.svg" class="innopoint item" />
          </TextField>
          <span
            class="helper {
              errors.rewardRateNotSpecified || errors.rewardRateInvalid ?
                'error' : 'required'
            }"
          >
            {#if errors.rewardRateNotSpecified}
              Award amount must be specified.
            {:else if errors.rewardRateInvalid}
              Must be positive.
            {:else}
              * Required
            {/if}
          </span>
        </div>
        <Dropdown dropdownclass="info-bubble" handleclass="round danger" chevron={false} isRight>
          <svg slot="label" src="images/icons/alert-circle.svg" class="icon" />
          Make sure you reconcile the amount of awarded innopoints with Andrey
          of Student Affairs, otherwise your project may be rejected!
        </Dropdown>
      </FormField>
    {/if}

    <FormField
      classname="people"
      id="people-required{index}"
      title="People required"
      wrapperclass="group"
      error={
        (errors.peopleRequiredNotSpecified && "Specify the amount of people or tick the box.")
        || (errors.peopleRequiredInvalid && "Must be positive.")
      }
    >
      <span slot="title" class="name">
        People required&nbsp;<span class="required">*</span>
      </span>
      <PeopleSelector
        activityIndex={index}
        bind:value={activity.people_required}
        bind:errorNotSpecified={errors.peopleRequiredNotSpecified}
        bind:errorInvalid={errors.peopleRequiredInvalid}
        on:change={() => fieldsAltered = true}
      />
    </FormField>

    <FormField
      classname="deadline"
      id="deadline{index}"
      title="Application deadline"
    >
      <Dropdown dropdownclass="btn-shift" noclose nowrap let:toggle>
        <svg src="images/icons/calendar.svg" class="icon mr-2" slot="label" />
        <span slot="label">
          {activity.application_deadline ?
            formatTime(activity.application_deadline)
            : 'select date'}
        </span>
        <DateTimePicker
          bind:value={activity.application_deadline}
          on:change={(e) => {
            toggle(e);
            fieldsAltered = true;
          }}
        />
      </Dropdown>
    </FormField>

    <FormField
      classname="questions"
      id="questions{index}"
      title="Feedback questions"
      subtitle="Those will make up the feedback form for volunteers."
    >
      <ActivityQuestions
        bind:value={activity.feedback_questions}
        on:change={() => fieldsAltered = true}
      />
    </FormField>

    <div class="actions">
      {#if fieldsAltered}
        <Button classname="mr" isDanger on:click={discardChanges}>
          {#if 'id' in activity}
            discard changes
          {:else}
            clear fields
          {/if}
        </Button>
      {:else}
        <Button
          classname="mr"
          isDanger
          on:click={cancelEdit}
          disabled={index === 0 && !('id' in activity)}
        >
          {#if 'id' in activity}
            cancel editing
          {:else}
            discard
          {/if}
        </Button>
      {/if}
      <Button isFilled on:click={validateAndSave}>
        {#if 'id' in activity}
          save changes
        {:else}
          create
        {/if}
      </Button>
    </div>
  </div>
</Card>
