<script>
  import Button from 'ui/button.svelte';
  import Card from 'ui/card.svelte';
  import FormField from 'ui/form-field.svelte';
  import TextField from 'ui/text-field.svelte';
  import Dropdown from 'ui/dropdown.svelte';
  import DatePicker from 'ui/date-picker.svelte';
  import CheckboxGroup from 'ui/checkbox-group.svelte';
  import competencesOptions from '@/constants/projects/competences';
  import Switch from 'ui/switch.svelte';
  import ActivityQuestions from './activity-questions.svelte';
  import {project, changeDeepField, save, createActivity, discardActivity, editActivity, changeActivityField, changeSaved} from '@/store/new-project';
  import {parseDates} from '@/utils/date-range';

  export let activity;
  export let newly = true;

  const change = (field, value, stop = false) => {
    if (!stop) {
      if (newly) changeDeepField('newActivity', field, value);
      else changeActivityField(activity.index, field, value);
    } else {
      changeSaved(false);
    }
  };
  const changeAndSave = (field, value) => {
    change(field, value);
    save();
  };
  const delayedChange = (field, value) => {
    if (newly) save();
    else changeAndSave(field, value);
  };

  const morePeopleCheckbox = ['the more, the better'];
  const changeMorePeople = (value) => {
    change('morePeople', value.length > 0);
    if (value.length > 0) changeAndSave('people', null);
  };
  const changePeople = (val, stop) => {
    if (activity.morePeople) change('morePeople', false);
    if (!stop) change('people', val);
    else changeSaved(false);
  };
</script>

<Card classname="card create-activity">
  <div class="left">
    <FormField
      classname="form-field name"
      id="activity-name"
      title="Activity name"
      required
    >
      <TextField
        id="activity-name"
        value={activity.name || ''}
        on:input={(e) => change('name', e.detail, activity.editing)}
        on:delayedChange={(e) => delayedChange('name', e.detail)}
      />
    </FormField>

    <FormField
      classname="form-field description"
      id="activity-description"
      title="Description"
    >
      <TextField
        multiline
        id="activity-description"
        value={activity.description || ''}
        on:input={(e) => change('description', e.detail, activity.editing)}
        on:delayedChange={(e) => delayedChange('description', e.detail)}
      />
    </FormField>

    <FormField
      title="Activity date"
      classname="form-field date-range"
      wrapperclass="some-wrapper"
    >
      <span slot="title" class="name">
        Activity date&nbsp;<span class="required">*</span>
      </span>
      <Dropdown>
        <svg src="/images/icons/calendar.svg" class="icon mr-2" slot="label" />
        <span slot="label">{activity.date.start ? parseDates(activity.date) : 'select date range'}</span>
        <DatePicker
          value={activity.date}
          on:change={(e) => changeAndSave('date', e.detail)}
        />
      </Dropdown>
    </FormField>

    <FormField
      title="Competences, developed by this activity (no more than 3)"
      classname="form-field competences"
      wrapperclass="some-wrapper"
    >
      <span slot="title" class="name">
        Competences, developed by this activity (no more than&nbsp;3)&nbsp;<span class="required">*</span>
      </span>
      <Dropdown label="select competences" dropdownclass="dropdown with-labels btn-shift">
        <CheckboxGroup
          labeled
          name="competences"
          value={activity.competences}
          items={competencesOptions}
          on:change={(e) => changeAndSave('competences', e.detail)}
        />
      </Dropdown>
    </FormField>

    <FormField
      title="Telegram username required"
      subtitle="With this option on, applicants will be prompted for their Telegram username."
      classname="form-field tg-username"
      wrapperclass="some-wrapper"
      id="tg-username"
    >
      <Switch
        id="tg-username"
        value={activity.telegramRequired}
        on:change={(e) => changeAndSave('telegramRequired', e.detail)}
      />
    </FormField>
  </div>


  <div class="right">
    <FormField
      classname="form-field reward-type"
      id="reward-type"
      title="The reward is"
      wrapperclass="hinted"
    >
      <Switch
        isTwoState
        id="reward-type"
        first="fixed"
        second="hourly"
        value={activity.isHourly}
        on:change={(e) => changeAndSave('isHourly', e.detail)}
      />
      <Dropdown dropdownclass="dropdown info-bubble" btnclass="handle round btn" chevron={false} isRight>
        <svg slot="label" src="/images/icons/help-circle.svg" class="icon" />
        Hourly rewards are typically granted for volunteering, while fixed rewards are
        for tasks like script writing and stage performances.
      </Dropdown>
    </FormField>

    {#if activity.isHourly}
      <FormField
        classname="form-field work-hours"
        id="work-hours"
        title="Work hours"
        subtitle="Reward rate: 70 ipts/hour"
        required
      >
        <TextField
          id="work-hours"
          type="number"
          placeholder="0"
          value={activity.hours || 0}
          on:input={(e) => change('hours', e.detail, activity.editing)}
          on:delayedChange={(e) => delayedChange('hours', e.detail)}
        />
      </FormField>
    {/if}

    <FormField
      classname="form-field reward-amt"
      id="reward-amt-fixed"
      wrapperclass="hinted"
    >
    <span slot="title" class="name">
      Innopoints awarded&nbsp;<span class="required">*</span>
    </span>
      <div class="text-field-wrapper">
        <TextField
          isWithItem
          isItemRight
          id="reward-amt-fixed"
          type="number"
          value={activity.reward || 0}
          on:input={(e) => change('reward', e.detail, activity.editing)}
          on:delayedChange={(e) => delayedChange('reward', e.detail)}
        >
          <svg src="/images/innopoint-sharp.svg" class="innopoint item" />
        </TextField>
        <span class="required">* Required</span>
      </div>
      <Dropdown dropdownclass="dropdown info-bubble" btnclass="handle round danger btn" chevron={false} isRight>
        <svg slot="label" src="/images/icons/alert-circle.svg" class="icon" />
        Make sure you reconcile the amount of awarded innopoints with Andrey
        of Student Affairs, otherwise your project may be rejected!
      </Dropdown>
    </FormField>

    <FormField
      classname="form-field people"
      id="people-required"
      title="People required"
      wrapperclass="group"
    >
      <span slot="title" class="name">
        People required&nbsp;<span class="required">*</span>
      </span>
      <TextField
        id="people-required"
        type="number"
        placeholder="0"
        isNoSpinner
        value={activity.people || 0}
        on:input={(e) => changePeople(e.detail, activity.editing)}
        on:delayedChange={(e) => changeAndSave('people', e.detail)}
      />
      <span class="divider">or</span>
      <CheckboxGroup
        labeled
        name="the-more"
        value={activity.morePeople ? morePeopleCheckbox : []}
        items={morePeopleCheckbox}
        on:change={(e) => changeMorePeople(e.detail)}
      />
    </FormField>

    <FormField
      classname="form-field deadline"
      id="deadline"
      title="Application deadline"
      wrapperclass="some-wrapper"
    >
      <Dropdown dropdownclass="dropdown btn-shift">
        <svg src="/images/icons/calendar.svg" class="icon mr-2" slot="label" />
        <span slot="label">{activity.deadline ? parseDates({start: activity.deadline}) : 'select date'}</span>
        <DatePicker
          value={activity.deadline}
          range={false}
          withControls={false}
          on:change={(e) => changeAndSave('deadline', e.detail)}
        />
      </Dropdown>
    </FormField>

    <FormField
      classname="form-field questions"
      id="questions"
      title="Feedback questions"
      subtitle="Those will make up the feedback form for volunteers."
      wrapperclass="some-wrapper"
    >
      <ActivityQuestions
        value={(activity.questions && activity.questions.length) ? activity.questions : ['']}
        on:change={(e) => change('questions', e.detail)}
        on:save={save}
      />
    </FormField>

    <div class="actions">
      {#if $project.activities.length && !activity.editing}
        <Button classname="btn mr" isDanger on:click={discardActivity}>discard</Button>
      {/if}
      {#if newly}
        <Button isFilled on:click={createActivity}>create</Button>
      {:else}
        <Button isFilled on:click={() => editActivity(activity.index, false)}>save</Button>
      {/if}
    </div>
  </div>
</Card>
