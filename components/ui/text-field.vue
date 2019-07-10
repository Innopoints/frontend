<template>
  <div :class="['text-field', item ? right ? 'with-item right' : 'with-item left' : '']">
    <input
      :type="type"
      :placeholder="placeholder"
      :name="name"
      :value="value"
      @focus="handleFocus"
      @blur="handleBlur"
      @input="handleInput"
    />

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
        required: false,
        default: 'text'
      },
      right: {
        type: Boolean,
        default: false
      },
      src: String,
      text: String,

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
      id: String,
      placeholder: String,
      name: String,
      min: Number,
      max: Number,
      handleFocus: Function,
      handleInput: Function,
      handleBlur: Function
    }
  };
</script>
