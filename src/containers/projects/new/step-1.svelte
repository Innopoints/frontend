<script>
  import { fade } from 'svelte/transition';
  import BottomNavigation from '@/components/projects/new/bottom-navigation.svelte';
  import StepHeader from '@/components/projects/new/step-header.svelte';
  import FormField from 'ui/form-field.svelte';
  import TextField from 'ui/text-field.svelte';
  import Button from 'ui/button.svelte';
  import Dropzone from 'ui/dropzone.svelte';
  import {project, changeField, save} from '@/store/new-project';
  import {readFileAsync} from '@/utils/read-files';

  $: file = $project.image;
  let image = null;
  $: (async() => image = file && file.name ? await readFileAsync(file) : null)();

  const addImage = async e => changeImageAndSave(e.detail[0]);
  const removeImage = () => changeImageAndSave(null);
  const changeImageAndSave = (val) => {
    changeField('image', val);
    save();
  };
</script>

<style>
  :global(.image-picker) {
    margin-top: 0;
  }
  :global(.image-platform input) {
    display: none;
  }
</style>

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
      value={$project.name || ''}
      on:input={(e) => changeField('name', e.detail)}
      on:delayedChange={save}
    />
  </FormField>

  <FormField title="Cover image" classname="form-field padded" id="image" wrapperclass="image-picker{image ? ' selected' : ''}">
    <span slot="subtitle" class="desc">
      <span class="lb">This is shown on the project card to catch attention.</span>
      <span class="lb">Best to use 16:9 photos.</span>
    </span>

    {#if image}
      <img src={image} alt="" class="shadow-1 mr" />
      <Button isDanger on:click={removeImage}>
        <svg src="/images/icons/trash-2.svg" class="icon" />
        <span class="text">delete</span>
      </Button>
    {:else}
      <Dropzone
        multiple={false}
        id="file-input"
        classname="image-platform"
        on:change={addImage}
      >
        <Button classname="btn option">
          <svg src="/images/icons/image.svg" class="icon mr" />
          upload cover image
        </Button>
      </Dropzone>
    {/if}
  </FormField>

  <FormField title="Organizer" classname="form-field padded" id="organizer" required>
    <span slot="subtitle" class="desc">
      Name of the organizing department or individual.
    </span>
    <TextField
      id="organizer"
      value={$project.organizer || ''}
      on:input={(e) => changeField('organizer', e.detail)}
      on:delayedChange={save}
    />
  </FormField>

  <BottomNavigation />
</form>
