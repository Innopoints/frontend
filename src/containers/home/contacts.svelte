<script>
  import Button from 'ui/button.svelte';
  import Card from 'ui/card.svelte';
</script>

<section class="contacts">
  <header>
    <h2>Any questions?</h2>
    <div class="subtitle">Don’t hesitate to contact us!</div>
  </header>
  <div>
    <Card>
      <a href="mailto:319@innopolis.ru" class="mr-2">
        <img class="icon" src="/images/home/mail-us.svg" alt="write to 319" />
      </a>
      <p>
        319@innopolis.ru
        <Button href="mailto:319@innopolis.ru">send us an email</Button>
      </p>
    </Card>
    <Card>
      <a href="https://t.me/andrejsblakunovs" class="mr-2" target="_blank">
        <img class="icon" src="/images/home/text-us.svg" alt="call to 319" />
      </a>
      <p>
        @andrejsblakunovs
        <Button href="https://t.me/andrejsblakunovs">text the admin</Button>
      </p>
    </Card>
  </div>
</section>
