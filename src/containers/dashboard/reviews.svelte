<script>
  import { Card, Button } from 'attractions';
  import Labeled from 'src/components/common/labeled.svelte';
  import EmptyState from 'src/components/common/empty-state.svelte';
  export let reviews = [];
</script>

<Card class="projects-review">
  <div class="title">
    <svg src="static/images/icons/check-square.svg" class="icon" />
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
            <svg slot="icon" src="static/images/icons/user.svg" class="icon" />
            {review.creator.full_name}
          </Labeled>
          <Button href="/projects/{review.id}">
            review
            <svg src="static/images/icons/arrow-right.svg" class="icon ml" />
          </Button>
        </li>
      {/each}
    </ul>
  {:else}
    <EmptyState small text="Everything reviewed!">
      <svg src="static/images/icons/smile.svg" />
    </EmptyState>
  {/if}
  <div class="actions">
    <Button href="/projects">browse the projects</Button>
  </div>
</Card>

<style src="../../../static/css/containers/dashboard/reviews.scss"></style>
