<script>
  import { Button, DropdownShell, Dropdown, TextField, Label } from 'attractions';

  export let value = [];

  function changeValue(index, event) {
    value[index] = event.detail.value;
  }

  function removeValue(index) {
    value.splice(index, 1);
    value = value;
  }

  function addValue() {
    value.push('');
    value = value;
  }
</script>


<div class="activity-questions">
  <DropdownShell let:toggle>
    <Button on:click={toggle}>
      <svg src="static/images/icons/message-circle.svg" class="mr" />
      customize
      <svg src="static/images/icons/chevron-down.svg" class="ml dropdown-chevron" />
    </Button>
    <Dropdown top>
      <Label class="mb">Feedback questions</Label>
      {#each value as question, i}
        <div class="row">
          <TextField value={question} maxlength={1024} on:change={(e) => changeValue(i, e)} />
          <Button
            danger
            round
            title="Delete question"
            on:click={(e) => { e.stopPropagation(); removeValue(i); }}
          >
            <svg src="static/images/icons/trash-2.svg" />
          </Button>
        </div>
      {/each}
      <div class="actions">
        <Button on:click={addValue}>
          <svg src="static/images/icons/plus.svg" class="mr" />
          add
        </Button>
        <Button on:click={toggle} filled>
          <svg src="static/images/icons/check.svg" class="mr" />
          save
        </Button>
      </div>
    </Dropdown>
  </DropdownShell>
</div>

<style src="../../../../static/css/components/projects/new/activity-questions.scss"></style>
