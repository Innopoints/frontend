<template>
  <section class="container tagline">
    <img src="/images/home/voxel-city.png" class="picture" />
    <div>
      <h1>Innopoints</h1>
      <div class="motto">Motivating the great beginnings</div>
      <nav>
        <Button
          link
          href="/events"
          label="get innopoints"
          filled
        />

        <Button
          link
          href="/shop"
          label="see the InnoStore"
          outline
        />
      </nav>
    </div>
  </section>
</template>

<script>
  import Button from '../ui/button';

  export default {
    name: "LandingTagline",
    components: { Button },
  };
</script>
