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
</script>

<Card classname="card create-activity">
  <div class="left">
    <FormField
      classname="form-field name"
      id="activity-name"
      title="Activity name"
      required
    >
      <TextField id="activity-name" />
    </FormField>

    <FormField
      classname="form-field description"
      id="activity-description"
      title="Description"
    >
      <TextField multiline id="activity-description" />
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
        <span slot="label">select date range</span>
        <DatePicker />
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
      <Dropdown label="select competences">
        <CheckboxGroup
          labeled
          items={competencesOptions}
          name="competences"
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
      <Switch id="tg-username" />
    </FormField>
  </div>


  <div class="right">
    <FormField
      classname="form-field reward-type"
      id="reward-type"
      title="The reward is"
      wrapperclass="hinted"
    >
      <Switch isTwoState id="reward-type" first="fixes" second="hourly" />
      <Dropdown dropdownclass="dropdown info-bubble" btnclass="handle round btn" chevron={false} isRight>
        <svg slot="label" src="/images/icons/help-circle.svg" class="icon" />
        Hourly rewards are typically granted for volunteering, while fixed rewards are
        for tasks like script writing and stage performances.
      </Dropdown>
    </FormField>

    <FormField
      classname="form-field reward-amt"
      id="reward-amt-fixed"
      wrapperclass="hinted"
    >
      <span slot="title" class="name">
        Innopoints awarded&nbsp;<span class="required">*</span>
      </span>
      <div class="text-field-wrapper">
        <TextField isWithItem isItemRight id="reward-amt-fixed" type="number">
          <svg src="/images/innopoint-sharp.svg" class="innopoint item" />
        </TextField>
        <span class="required">* Required</span>
      </div>
      <Dropdown dropdownclass="dropdown info-bubble" btnclass="handle round btn" chevron={false} isRight>
        <svg slot="label" src="/images/icons/help-circle.svg" class="icon" />
        Stage performances and tasks for a single day earn around 300 ipts,
        more global tasks like sponsor communication could earn 500 ipts.
      </Dropdown>
    </FormField>

    <FormField
      classname="form-field work-hours"
      id="work-hours"
      title="Work hours"
      subtitle="Reward rate: 70 ipts/hour"
      required
    >
      <TextField id="work-hours" type="number" placeholder="0" />
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
      <TextField id="people-required" type="number" placeholder="0" isNoSpinner />
      <span class="divider">or</span>
      <CheckboxGroup
        labeled
        items={['the more, the better']}
        name="the-more"
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
        <span slot="label">select date</span>
        <DatePicker />
      </Dropdown>
    </FormField>

    <FormField
      classname="form-field questions"
      id="questions"
      title="Feedback questions"
      subtitle="Those will make up the feedback form for volunteers."
      wrapperclass="some-wrapper"
    >
      <Dropdown dropdownclass="dropdown btn-shift">
        <svg src="/images/icons/message-circle.svg" class="icon mr" slot="label" />
        <span slot="label">customize</span>
        <span class="label">Feedback questions</span>
        <div class="row">
          <TextField id="question-1" />
          <Button isDanger isRound>
            <svg src="/images/icons/trash-2.svg" />
          </Button>
        </div>
        <div class="actions">
          <Button>
            <svg src="/images/icons/plus.svg" class="icon mr" />
            add
          </Button>
          <Button>
            <svg src="/images/icons/check.svg" class="icon mr" />
            save
          </Button>
        </div>
      </Dropdown>
    </FormField>

    <div class="actions">
      <Button classname="btn mr" isDanger>discard</Button>
      <Button isFilled>create</Button>
    </div>
  </div>
</Card>
