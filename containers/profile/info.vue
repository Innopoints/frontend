<template>
  <section class="quick-info padded">
    <h1 class="btn-align vertical">{{ user.name }} {{ user.surname }}</h1>
    <div class="balance">
      <p class="btn-align">
        <span>{{ user.innopoints }}</span>
        <img src="/images/innopoint.svg" />
        available
      </p>
      <nav class="btn-shift">
        <Button
          link
          href="/shop"
          img="/images/profile/shopping-bag.svg"
          label="go to the InnoStore"
          class="mr"
        />
        <Button
          link
          href="#"
          img="/images/profile/medal.svg"
          label="request innopoints"
          class="mr"
        />
      </nav>
    </div>

    <div class="personal">
      <h1 class="horizontal">{{ user.name }} {{ user.surname }}</h1>
      <div class="telegram">
        <Button
          outline
          img="/images/profile/send.svg"
          label="add Telegram username"
        />

        <Dropdown :chevron="false" right>
          <template v-slot:opener>
            <img src="/images/profile/help-circle.svg" class="icon" />
          </template>
          <Button
            img="/images/x.svg"
            round
            normal
            class="close"
          />
          Some event organizers prefer to collect those to ease communication. Adding one here will save you the typing for those
          occasions (you will still be able to control what you send).
        </Dropdown>
      </div>
    </div>
  </section>
</template>

<script>
  import Button from '../../components/ui/button';
  import Dropdown from '../../components/ui/dropdown';

  export default {
    name: 'ProfileInfo',
    components: { Dropdown, Button },
    props: {
      user: Object,
    },
  };
</script>
