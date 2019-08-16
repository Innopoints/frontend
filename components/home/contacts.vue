<template>
  <section class="contacts">
    <header>
      <h2>Any questions?</h2>
      <div class="subtitle">Don’t hesitate to contact us!</div>
    </header>
    <div>
      <Card>
        <a href="mailto:319@innopolis.ru" class="mr-2">
          <img src="/images/home/mail-us.svg" />
        </a>
        <div>
          <p style="padding-top: 1em;">319@innopolis.ru</p>
          <a class="btn" href="mailto:319@innopolis.ru">send us an email</a>
        </div>
      </Card>
      <Card>
        <a href="tel:+7 (843) 203-92-53">
          <img src="/images/home/call-us.svg" />
        </a>
        <p style="padding: 0 1em;">
          +7 (843) 203-92-53 <br />
          (ext. 176)
        </p>
      </Card>
    </div>
  </section>
</template>

<script>
  import Card from '../ui/card';

  export default {
    name: "LandingContacts",
    components: { Card },
  };
</script>
