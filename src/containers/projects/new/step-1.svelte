<script>
  import { fade } from 'svelte/transition';
  import NavigationDropdown from '@/components/projects/new/steps-navigation.svelte';
  import FormField from 'ui/form-field.svelte';
  import TextField from 'ui/text-field.svelte';
  import Button from 'ui/button.svelte';
</script>

<form transition:fade={{duration:200}}>
  <header class="padded form-header">
    <h1>
      Create a Project
      <span class="autosave visible">
        <svg src="/images/icons/check.svg" class="icon mr" />
          draft auto-saved
        </span>
    </h1>
    <h2>Step 1. Fill out the general information about the project</h2>
  </header>
  <NavigationDropdown />
  <FormField title="Project name" classname="form-field padded" id="title" required>
    <span slot="subtitle" class="desc">
      <span class="lb">This has to be different from other projects.</span>
      <span class="lb">Adding the year to the name usually helps:</span><br>
      <em>“Halloween” → “Halloween 2019”</em>
    </span>
    <TextField id="title" />
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

  <div class="actions padded">
    <p class="error">Some required fields are still empty :c</p>
    <Button href="/projects/new?step=2" isFilled classname="btn mt">
      next step
      <svg src="/images/icons/arrow-right.svg" class="icon ml" />
    </Button>
  </div>
</form>
