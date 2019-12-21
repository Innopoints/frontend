<script>
  import Button from 'ui/button.svelte';
  import {isAuthed, user} from '@/store/user';
</script>

<section class="tagline padded">
  <img
    src="images/projects/voxel-volunteering.png"
    class="hide-tb picture"
    alt="projects image" />
  <div>
    <div class="headline">Become a volunteer</div>
    <div class="subhead">
      If you’re seeking an opportunity to contribute to the wonderful world of
      Innopolis projects, you’re in the right place!
    </div>
    {#if $isAuthed && $user.isAdmin}
      <div class="actions">
        <Button isOutline classname="btn rectangle" href="/projects/new">
          <svg src="/images/icons/plus.svg" class="icon mr" />
          create new project
        </Button>
      </div>
    {/if}
  </div>
</section>
