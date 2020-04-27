<script>
  import Card from 'ui/card.svelte';
  import Button from 'ui/button.svelte';
  import Labeled from 'ui/labeled.svelte';
  export let reviews = [];
</script>

<Card classname="card projects-review">
  <div class="title">
    <svg src="/images/icons/check-square.svg" class="icon" />
    Projects for review
  </div>
  {#if reviews.length}
    <ul class="projects">
      {#each reviews as review (review.name)}
        <li>
          <div class="title">
            {review.name}
          </div>
          <Labeled label="Creator" icon>
            <svg slot="icon" src="/images/icons/user.svg" class="icon" />
            {review.creator.full_name}
          </Labeled>
          <Button href="/projects/{review.id}">
            review
            <svg src="/images/icons/arrow-right.svg" class="icon ml" />
          </Button>
        </li>
      {/each}
    </ul>
  {:else}
    <div class="empty small">
      <div class="icon">
        <svg src="/images/icons/smile.svg" />
      </div>
      <div class="title">Everything reviewed!</div>
    </div>
  {/if}
  <div class="actions">
    <Button href="/projects">browse the projects</Button>
  </div>
</Card>
