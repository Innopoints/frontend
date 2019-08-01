<template>
  <div :class="{open: isOpen}" class="dropdown-shell">
    <button
      @click="toggle"
      v-ripple="'rgba(56, 120, 0, .25)'"
      type="button"
      class="btn handle"
    >
      <slot name="label">
        {{ label }}
      </slot>
      <img v-if="chevron" src="/images/events/chevron-down.svg" class="chevron" />
    </button>
    <div :class="{'right-edge': right}" class="dropdown">
      <div class="relative-wrapper">
        <button @click="isOpen = false" class="btn normal round close">
          <img src="/images/ui-kit/x.svg" />
        </button>
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
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Dropdown',
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
.dropdown > .relative-wrapper {
  padding: 1em;
  min-width: 10em;
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
