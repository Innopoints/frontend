<script>
  import BottomNavigation from '@/components/projects/new/bottom-navigation.svelte';
  import StepHeader from '@/components/projects/new/step-header.svelte';
  import ProjectImagePicker from '@/components/projects/new/project-image-picker.svelte';
  import FormField from 'ui/form-field.svelte';
  import TextField from 'ui/text-field.svelte';

  export let project;
  export let duplicateName;
  export let autosaved;
  export let isUploading = false;
</script>

<form>
  <StepHeader
    step={1}
    subtitle="Step 1. Fill out the general information about the project"
    {autosaved}
  />

  <FormField
    title="Project name"
    classname="padded"
    id="name"
    required
    error={
         (duplicateName && "The name must be unique.")
      || ($project.name === '' && "The name must not be empty.")
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
      autocomplete={false}
      maxlength={128}
      value={$project.name || ''}
      on:change={(event) => $project.name = event.detail}
    />
  </FormField>

  <FormField
    title="Cover image"
    classname="padded"
    id="image"
    wrapperclass="image-picker"
  >
    <span slot="subtitle" class="desc">
      <span class="lb">This is shown on the project card to catch attention.</span>
      <span class="lb">Best to use 16:9 photos.</span>
    </span>
    <ProjectImagePicker bind:value={$project.image_id} {isUploading} on:uploading on:resize-image />
  </FormField>

  <BottomNavigation step={1} error={!$project.name ? 1 : null} />
</form>
