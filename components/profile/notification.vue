<template>
  <li :class="[precise ? 'precise' : 'section', {'collapsed': collapsed}]">
    <header>
      <div class="title">
        {{ title }}
        <Dropdown
          v-if="tooltip"
          :chevron="false"
          :dropdown-classes="['info-bubble']"
          :button-classes="['round']"
          :with-wrapper="false"
          right
        >
          <template v-slot:label>
            <HelpIcon class="icon" />
          </template>
          {{ tooltip }}
        </Dropdown>
        <Button
          v-if="collapsible"
          :label="collapsed ? 'expand' : 'collapse'"
          @click="collapse"
          chevron
          class="handle section-ctl"
        />
      </div>
      <ProfileRadioGroup :name="title" />
    </header>
    <ul v-if="collapsible">
      <ProfileNotification
        v-for="(notification, i) in children"
        :key="i"
        v-bind="notification"
        precise
      />
    </ul>
  </li>
</template>

<script>
  import ProfileRadioGroup from './radio-group';
  import Button from '../ui/button';
  import Dropdown from '../ui/dropdown';
  import HelpIcon from '../../static/images/icons/help-circle.svg';

  export default {
    name: 'ProfileNotification',
    components: {
      Dropdown,
      Button,
      ProfileRadioGroup,
      HelpIcon,
    },
    props: {
      title: String,
      tooltip: String,
      children: Array,
      precise: Boolean,
    },
    data() {
      return {
        collapsible: !!this.children,
        collapsed: false,
      };
    },
    methods: {
      collapse() {
        this.collapsed = !this.collapsed;
      },
    },
  };
</script>
