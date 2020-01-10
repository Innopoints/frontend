<script>
  import StarRating from 'ui/star-rating.svelte';
  import Card from 'ui/card.svelte';

  let value = null;
  let value2 = 3;
</script>

<Card id="stars-selectable">
  <h1>Star Ratings</h1>
  <div class="showcase vertical">
    <StarRating bind:value name="star-rating1" />
    <StarRating bind:value={value2} max={10} name="star-rating2" />
  </div>
</Card>
