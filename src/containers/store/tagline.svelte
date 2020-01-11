<script>
  import Button from 'ui/button.svelte';
  import Dot from 'ui/dot';
  import {isAuthed, user} from '@/store/user';
</script>

<section class="tagline padded">
  <img
    src="images/store/voxel-trolley.png"
    class="hide-tb picture"
    alt="store image" />
  <div>
    <div class="headline">InnoStore</div>
    <div class="subhead">
      The place where your hard work and proactivity turns into cool merch of
      Innopolis University.
    </div>
    {#if $isAuthed && $user.is_admin}
      <div class="actions">
        <Button isOutline classname="btn rectangle" href="/item/new">
          <svg src="/images/icons/plus.svg" class="icon mr" />
          create new product
        </Button>
        <Button isOutline classname="btn rectangle" href="/dashboard">
          <svg src="/images/icons/shopping-bag.svg" class="icon mr" />
          manage purchases
          <Dot active />
        </Button>
      </div>
    {/if}
  </div>
</section>
