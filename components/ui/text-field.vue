<template>
  <div :class="classes">
    <input
      :type="type"
      :placeholder="placeholder"
      :name="name"
      :value="value"
      :id="id"
      :pattern="pattern"
      @focus="handleFocus"
      @blur="handleBlur"
      @input="handleInput"
    />

    <label v-if="outline" :for="id" class="label">{{ label }}</label>

    <template v-if="item">
      <span
        v-if="item === 'text'"
        class="item"
      >
        {{ text }}
      </span>

      <img
        v-else-if="item === 'img'"
        :src="src"
        class="item"
        alt=""
      />
    </template>

    <span v-if="pattern" class="error"> {{ error }}</span>
  </div>
</template>

<script>
  export default {
    name: 'TextField',
    model: {
      prop: 'value',
      event: 'change'
    },
    props: {

      // Wrapper props
      item: {
        type: String,
        default: ''
      },
      right: {
        type: Boolean,
        default: false
      },
      src: String,
      text: String,

      // Outline component requires label and id props
      outline: {
        type: Boolean,
        default: false
      },
      label: String,
      id: String,

      // Input props
      type: {
        type: String,
        default: 'text'
      },
      disabled: {
        type: Boolean,
        default: false
      },
      value: [String, Number],
      placeholder: String,
      pattern: String,
      error: String,
      name: String,
      min: Number,
      max: Number,
      focus: Function,
      input: Function,
      blur: Function
    },
    computed: {
      classes() {
        let arr = ['text-field'];
        if(this.item) {
          if(this.right) {
            arr.push('with-item', 'right');
          } else {
            arr.push('with-item', 'left');
          }
        }
        if(this.outline) arr.push('outline');

        return arr;
      }
    },
    methods: {
      handleFocus() {
        if(this.focus) this.focus();
      },
      handleBlur() {
        if(this.blur) this.blur();
      },
      handleInput() {
        if(this.input) this.input();
      }
    }
  };
</script>
