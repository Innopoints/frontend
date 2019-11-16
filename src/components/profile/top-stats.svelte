<script>
  import Button from 'ui/button.svelte';
  import Dot from 'ui/dot.svelte';
  import { user } from '@/store/user';
</script>

<div class="top-stats">
  <div class="stat">
    <header>
      <svg src="images/icons/clock.svg" class="icon" />
      {$user.hours} volunteering hours
    </header>
    <div class="details">15 volunteering positions handled</div>
  </div>
  <div class="stat">
    <header>
      <svg src="images/icons/star.svg" class="icon" />
      Volunteer rating
      <span class="rating">{$user.rating}</span>
    </header>
    <Button>
      view feedback<Dot />
    </Button>
  </div>
</div>
