<template>
  <li class="section">
    <header>
      <div class="title">
        {{ title }}
        <Button
          v-if="collapsible"
          :label="expand ? 'collapse' : 'expand'"
          img="/images/profile/chevron-down.svg"
          class="handle section-ctl"
        />
      </div>
      <ProfileRadioGroup :name="title" />
    </header>
  </li>
</template>

<script>
  import ProfileRadioGroup from './radio-group';
  import Button from '../ui/button';

  export default {
    name: 'ProfileNotification',
    components: { Button, ProfileRadioGroup },
    props: {
      title: String,
      tooltip: String,
      children: Array,
    },
    data() {
      return {
        collapsible: !!this.children,
        expand: true,
      };
    },
  };
</script>
