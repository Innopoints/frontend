<script>
  import { createEventDispatcher } from 'svelte';
  import TextField from 'ui/text-field.svelte';
  import CheckboxGroup from 'ui/checkbox-group.svelte';

  export let value = null;
  export let activityIndex;
  export let errorNotSpecified;
  export let errorInvalid;

  let rememberedPeopleRequired = null;
  const morePeopleCheckbox = { value: null, checked: value === 0 };

  function processTextFieldChange({ detail: fieldValue }) {
    morePeopleCheckbox.checked = false;
    errorNotSpecified = fieldValue === '';
    errorInvalid = +fieldValue < 1;

    if (!errorNotSpecified && !errorInvalid) {
      value = +fieldValue;
      dispatch('change', value);
    }
  }

  function processCheckboxChange({ detail: checkValue }) {
    if (checkValue.checked) {
      rememberedPeopleRequired = value;
      value = 0;
    } else {
      value = rememberedPeopleRequired || 1;
    }
    errorNotSpecified = false;
    errorInvalid = false;
    dispatch('change', value);
  }

  const dispatch = createEventDispatcher();
</script>


<TextField
  id="people-required{activityIndex}"
  type="number"
  placeholder="1"
  min={1}
  max={99999}
  isNoSpinner
  value={value != null && value != 0 ? value : ''}
  on:change={processTextFieldChange}
/>
<span class="divider">or</span>
<CheckboxGroup
  name="the-more"
  items={[morePeopleCheckbox]}
  labels={["the more, the better"]}
  on:change={processCheckboxChange}
/>
