<template>
  <section class="quick-info padded">
    <h1 class="btn-align vertical">{{ name }} {{ surname }}</h1>
    <div class="balance">
      <p class="btn-align">
        <span>{{ balance }}</span>
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
      <h1 class="horizontal">{{ name }} {{ surname }}</h1>
      <div class="telegram">
        <Button
          outline
          img="/images/profile/send.svg"
          label="add Telegram username"
        />

        <Dropdown
          :chevron="false"
          :dropdown-classes="['info-bubble']"
          :button-classes="['round']"
          :with-wrapper="false"
          right
        >
          <template v-slot:label>
            <HelpIcon class="icon" />
          </template>
          Some event organizers prefer to collect those to ease communication. Adding one here will save you the typing for those
          occasions (you will still be able to control what you send).
        </Dropdown>
      </div>
    </div>
  </section>
</template>

<script>
  import {mapState} from 'vuex';
  import Button from '../../components/ui/button';
  import Dropdown from '../../components/ui/dropdown';
  import HelpIcon from '@/static/images/icons/help-circle.svg';

  export default {
    name: 'ProfileInfo',
    components: {
      Dropdown,
      Button,
      HelpIcon,
    },
    computed: {
      ...mapState({
        balance: state => state.user.balance,
        name: state => state.user.name,
        surname: state => state.user.surname,
      }),
    },
  };
</script>
