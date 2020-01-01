<script>
  import Button from 'ui/button.svelte';
  import {API_HOST} from '@/constants/env';
  import {isAuthed} from '@/store/user';
</script>

<section class="tagline padded">
  <img
    src="images/projects/voxel-volunteering.png"
    class="hide-tb picture"
    alt="projects image" />
  <div>
    <div class="headline">Become a volunteer</div>
    <div class="subhead">
      <p>
        If you’re seeking an opportunity to contribute to the wonderful world of Innopolis projects,
        you’re in the right place!
      </p>
      {#if $isAuthed}
        <div class="actions">
          <Button isOutline classname="btn rectangle" href="/projects/new">
            <svg src="/images/icons/plus.svg" class="icon mr" />
            create new project
          </Button>
        </div>
      {:else}
        <p class="signin-prompt">
          Got a fresh idea? <a href="{API_HOST}login">Sign in</a> to create a project of your own.
        </p>
      {/if}
    </div>
  </div>
</section>
