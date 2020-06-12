<script>
  import BottomNavigation from '@/components/projects/new/bottom-navigation.svelte';
  import StepHeader from '@/components/projects/new/step-header.svelte';
  import ProjectImagePicker from '@/components/projects/new/project-image-picker.svelte';
  import { FormField, TextField } from 'attractions';
  import spaceOnly from '@/utils/space-only.js';

  export let project;
  export let autosaved;
</script>

<div class="form step-1">
  <StepHeader
    step={1}
    subtitle="Step 1. Fill out the general information about the project"
    {autosaved}
  />

  <FormField
    name="Project name"
    class="padded"
    required
    errors={[spaceOnly($project.name) && "The name must not be empty."]}
  >
    <TextField
      id="name"
      autocomplete={false}
      maxlength={128}
      bind:value={$project.name}
    />
  </FormField>

  <FormField
    name="Cover image"
    help="This is shown on the project card to catch attention."
    class="padded"
  >
    <ProjectImagePicker bind:value={$project.image_id} />
  </FormField>

  <BottomNavigation step={1} error={!$project.name ? 1 : null} />
</div>

<style src="../../../../static/css/containers/projects/new/step-1.scss"></style>
