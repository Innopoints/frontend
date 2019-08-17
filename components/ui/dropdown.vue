<template>
  <div :class="{open: isOpen}" class="dropdown-shell">
    <Button
      @click="toggle"
      :class="buttonClasses"
      class="handle"
    >
      <slot name="label">
        {{ label }}
      </slot>
      <img v-if="chevron" src="/images/events/chevron-down.svg" class="chevron" />
    </Button>
    <div :class="[{'right-edge': right}, ...dropdownClasses]" class="dropdown">
      <Button
        @click="toggle"
        normal
        round
        img="/images/icons/x.svg"
        class="close"
      />
      <div v-if="withWrapper || items" class="relative-wrapper">
        <slot>
          <div
            v-for="(option, i) in options"
            :key="option.value"
            @click="select(option)"
            :class="{selected: option.value === valObj.value}"
            class="option"
          >
            <slot :index="i" :item="option" name="item">
              <p>{{ option.text }}</p>
            </slot>
          </div>
        </slot>
      </div>
      <slot v-else />
    </div>
  </div>
</template>

<script>
  import Button from '@/components/ui/button';

  export default {
    name: 'Dropdown',
    components: { Button},
    props: {
      items: {
        type: Array,
      },
      value: {
        type: [Object, String],
        validator(val) {
          if(typeof val === 'string') return true;
          if(typeof val === 'object') return 'text' in val && 'value' in val;
          return false;
        },
      },
      returnObject: {
        type: Boolean,
        default: false,
      },
      label: {
        type: String,
        required: false,
      },
      right: {
        type: Boolean,
        default: false,
      },
      chevron: {
        type: Boolean,
        default: true,
      },
      withWrapper: {
        type: Boolean,
        default: true,
      },
      dropdownClasses: Array,
      buttonClasses: Array,
    },
    data() {
      return {
        isOpen: false,
      };
    },
    computed: {
      options() {
        if(!Array.isArray(this.items))
          return [];
        return this.items.map(item =>
          typeof item === 'string'
            ? {text: item, value: item}
            : item
        );
      },
      valObj() {
        if(typeof this.value === 'string')
          return {text: this.value, value: this.value};
        return this.value;
      },
    },
    methods: {
      toggle() {
        this.isOpen = !this.isOpen;
      },
      select(option) {
        this.$emit('input', this.returnObject ? option : option.value);
        this.toggle();
      },
    },
  };
</script>

<style lang="scss" scoped>
  .close {
    position: absolute !important;
    z-index: 100;
  }

  .dropdown > .relative-wrapper {
    padding: 1em;
    padding-right: 3.5em;
    min-width: 11em;
  }

  .option {
    cursor: pointer;
    padding: 5px;
    border-radius: 10px;

    &:hover {
      background-color: #F6F6F6;
    }

    &.selected {
      background-color: rgba(56, 120, 0, 0.12);
    }
  }
</style>
