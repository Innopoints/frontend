<template>
  <section class="container tagline">
    <img src="/images/home/voxel-city.png" class="picture desktop" />
    <img src="/images/home/innopoint-logo.svg" class="picture mobile" />
    <div>
      <h1>Innopoints</h1>
      <div class="motto">Motivating the great beginnings</div>
      <nav>
        <Button
          link
          href="/projects"
          label="get innopoints"
          filled
        />

        <Button
          link
          href="/store"
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
