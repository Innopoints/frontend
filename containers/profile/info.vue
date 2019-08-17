<template>
  <section class="quick-info padded">
    <h1 class="btn-align vertical">{{ name }} {{ surname }}</h1>
    <div class="balance">
      <p class="btn-align">
        <span>{{ balance }}</span>
        <Innopoint />
        available
      </p>
      <nav class="btn-shift">
        <Button
          link
          href="/store"
          img="/images/icons/shopping-bag.svg"
          label="go to the InnoStore"
          class="mr"
        />
        <Button
          link
          href="#"
          img="/images/icons/award.svg"
          label="request innopoints"
          class="mr"
        />
      </nav>
    </div>

    <div class="personal">
      <h1 class="horizontal">{{ name }} {{ surname }}</h1>
      <div v-if="tgChange" class="telegram input">
        <TextField
          :value="tgVal"
          @input="changeVal"
          outline
          label="Telegram"
          item="img"
          src="/images/icons/at-sign.svg"
          pattern="[A-Za-z0-9_]{5,32}"
          error="A username should contain from 5 to 32 symbols: a–z, 0–9, _."
          class="mt-2"
        />
        <div class="actions">
          <Button
            @click="tgChange = false"
            label="cancel"
            class="mr"
          />
          <Button
            @click="save"
            filled
            label="save"
          />
        </div>
      </div>
      <div v-else-if="telegram" class="telegram exists">
        @{{ telegram }}
        <Button
          @click="tgChange = true"
          img="/images/icons/edit.svg"
          class="ml"
          label="edit"
        />
      </div>
      <div v-else class="telegram">
        <Button
          @click="tgChange = true"
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
  import {mapState, mapActions} from 'vuex';
  import Button from '../../components/ui/button';
  import Dropdown from '../../components/ui/dropdown';
  import HelpIcon from '@/static/images/icons/help-circle.svg';
  import TextField from '@/components/ui/text-field';
  import Innopoint from '@/static/images/innopoint-sharp.svg';

  export default {
    name: 'ProfileInfo',
    components: {
      TextField,
      Dropdown,
      Button,
      HelpIcon,
      Innopoint,
    },
    data() {
      return {
        tgChange: false,
        tgVal: this.telegram,
      };
    },
    computed: {
      ...mapState({
        balance: state => state.user.balance,
        name: state => state.user.name,
        surname: state => state.user.surname,
        telegram: state => state.user.telegram,
      }),
    },
    methods: {
      ...mapActions({
        changeField: 'user/changeField',
      }),
      changeVal(val) {
        this.tgVal = val;
      },
      save() {
        this.changeField({field: 'telegram', value: this.tgVal});
        this.tgChange = false;
      },
    },
  };
</script>
