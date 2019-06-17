<template>
  <section class="contacts shadow-2">
    <header>
      <h2>Any questions?</h2>
      <div class="subtitle">Don’t hesitate to contact us!</div>
    </header>
    <div class="center">
      <div class="card shadow-2">
        <a href="mailto:319@innopolis.ru">
          <img src="/images/landing/mail-us.svg" />
        </a>
        <div>
          <p>319@innopolis.ru</p>
          <a class="btn link green" href="mailto:319@innopolis.ru">send us an email</a>
        </div>
      </div>

      <div class="card shadow-2">
        <a href="tel:+7 (843) 203-92-53">
          <img src="/images/landing/call-us.svg" />
        </a>
        <p>
          +7 (843) 203-92-53 <br />
          (ext. 176)
        </p>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: "LandingContacts"
  };
</script>

<style scoped>
  .contacts {
    background: url('/images/landing/full-cover.svg') no-repeat;
    background-size: cover;
  }
</style>
