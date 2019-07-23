<template>
  <label class="chip-wrapper">
    <input
      :checked="value"
      @click="trigger"
      :disabled="disabled"
      :type="multiple ? 'checkbox' :'radio'"
      :name="name"
    />
    <div
      :class="{unclickable: disabled, small, outline}"
      class="chip"
    >
      <slot>{{ text }}</slot>
    </div>
  </label>
</template>

<script>
  export default {
    props: {
      multiple: {
        type: Boolean,
        default: false,
      },
      text: {
        type: String,
        required: false,
      },
      value: {
        type: Boolean,
        default: false,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      small: {
        type: Boolean,
        default: false,
      },
      outline: {
        type: Boolean,
        default: false,
      },
      name: {
        type: String,
        default: 'group',
      },
    },
    data() {
      return {
        checked: false,
      };
    },
    watch: {
      value: {
        immediate: true,
        handler(newVal) {
          this.checked = newVal;
        },
      },
    },
    methods: {
      trigger() {
        if(!this.multiple && this.checked || this.disabled)
          return;
        this.checked = !this.checked;
        this.$emit('input', this.checked);
      },
    },
  };
</script>

<style scoped>
.chip-wrapper {
  display: inline-block;
}

.chip-wrapper > input {
  clip: rect(0, 0, 0, 0);
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  position: absolute;
}

.chip {
  border-radius: 25px;
  background-color: rgba(0, 0, 0, 0.08);
  color: #656565;
  padding: 0.6em 0.9em;
  font-weight: 500;
}

.chip:not(.unclickable) {
  cursor: pointer;
  user-select: none;
  -webkit-touch-callout: none;
}

.chip.small {
  padding: 0.5em;
  font-size: 0.9rem;
  min-width: 0.9rem;
  text-align: center;
}

.chip.outline {
  border: 1px solid rgba(0, 0, 0, 0.2);
  background-color: transparent;
}

.chip.unclickable.outline {
  border-color: #387800;
}

input:disabled + .chip {
  background-color: rgba(0, 0, 0, 0.03);
  color: #aaa;
  cursor: default;
}

input:disabled + .chip:hover {
  background-color: rgba(0, 0, 0, 0.03);
}

input + .chip:hover {
  background-color: rgba(0, 0, 0, 0.13);
}

input + .chip.outline:hover {
  background-color: rgba(0, 0, 0, 0.06);
}

input:focus + .chip {
  background-color: rgba(0, 0, 0, 0.18);
}

input:focus + .chip.outline {
  background-color: rgba(0, 0, 0, 0.1);
}

input:checked + .chip {
  background-color: rgba(56, 120, 0, 0.12);
  color: #387800;
}

input:checked + .chip.outline {
  background-color: rgba(56, 120, 0, 0.06);
  color: #387800;
  border-color: #387800;
}

input:focus:checked + .chip {
  background-color: rgba(56, 120, 0, 0.25);
}

input:focus:checked + .chip.outline {
  background-color: rgba(56, 120, 0, 0.12);
}

input[type="checkbox"] + .chip {
  position: relative;
}

input[type="checkbox"]:checked + .chip {
  padding-left: 2em;
}

input[type="checkbox"] + .chip::before {
  border: 0 solid #387800;
  content: "";
}

input[type="checkbox"]:checked + .chip::before {
  width: 5px;
  height: 9px;
  border-bottom-width: 2px;
  border-right-width: 2px;
  transform: translateY(-50%) rotate(45deg);
  position: absolute;
  left: 0.9em;
  top: 45%;
}
</style>
