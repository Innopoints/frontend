<script>
  import { Card, Button } from 'attractions';
  import Labeled from '@/components/common/labeled.svelte';
  import EmptyState from '@/components/common/empty-state.svelte';
  export let reviews = [];
</script>

<Card class="projects-review">
  <div class="title">
    <svg src="images/icons/check-square.svg" class="icon" />
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
            <svg slot="icon" src="images/icons/user.svg" class="icon" />
            {review.creator.full_name}
          </Labeled>
          <Button href="/projects/{review.id}">
            review
            <svg src="images/icons/arrow-right.svg" class="icon ml" />
          </Button>
        </li>
      {/each}
    </ul>
  {:else}
    <EmptyState small text="Everything reviewed!">
      <svg src="images/icons/smile.svg" />
    </EmptyState>
  {/if}
  <div class="actions">
    <Button href="/projects">browse the projects</Button>
  </div>
</Card>

<style src="../../../static/css/containers/dashboard/reviews.scss"></style>
