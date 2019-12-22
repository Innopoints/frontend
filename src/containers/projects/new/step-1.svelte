<script>
  import { fade } from 'svelte/transition';
  import { onMount } from 'svelte';
  import BottomNavigation from '@/components/projects/new/bottom-navigation.svelte';
  import StepHeader from '@/components/projects/new/step-header.svelte';
  import FormField from 'ui/form-field.svelte';
  import TextField from 'ui/text-field.svelte';
  import Button from 'ui/button.svelte';
  import {project, changeField, save, createProject} from '@/store/new-project';

  onMount(() => {
    createProject();
  });
</script>

<form transition:fade={{duration:200}}>
  <StepHeader subtitle="Step 1. Fill out the general information about the project" />

  <FormField title="Project name" classname="form-field padded" id="title" required>
    <span slot="subtitle" class="desc">
      <span class="lb">This has to be different from other projects.</span>
      <span class="lb">Adding the year to the name usually helps:</span><br>
      <em>“Halloween” → “Halloween 2019”</em>
    </span>
    <TextField
      id="title"
      value={$project.name}
      on:input={(e) => changeField('name', e.detail)}
      on:delayedChange={save}
    />
  </FormField>

  <FormField title="Cover image" classname="form-field padded" id="image" wrapperclass="image-picker">
    <span slot="subtitle" class="desc">
      <span class="lb">This is shown on the project card to catch attention.</span>
          <span class="lb">Best to use 16:9 photos.</span>
    </span>

    <Button classname="btn option">
      <svg src="/images/icons/image.svg" class="icon mr" />
      upload cover image
    </Button>
    <Button classname="btn option">
      <svg src="/images/icons/grid.svg" class="icon mr" />
      select from stock gallery
    </Button>
    <img src="/images/create-project/arro.png" class="shadow-1 mr" alt="">
    <Button isDanger>
      <svg src="/images/icons/trash-2.svg" class="icon" />
      <span class="text">delete</span>
    </Button>
  </FormField>

  <FormField title="Organizer" classname="form-field padded" id="organized" required>
    <span slot="subtitle" class="desc">
      Name of the organizing department or individual.
    </span>
    <TextField id="organized" />
  </FormField>

  <BottomNavigation />
</form>
