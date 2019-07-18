<template>
  <div class="form-field">
    <label :for="id">
      <span class="name">
        {{ title }}
        <span v-if="required" class="required">*</span>
      </span>
      <span class="desc">
        {{ subtitle }}
      </span>
    </label>
    <div class="text-field-wrapper">
      <slot />
      <span v-if="required" class="required">* Required</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'FormField',
    props: {
      id: String,
      title: {
        type: String,
        required: true
      },
      subtitle: {
        type: String,
        default: ''
      },
      required: {
        type: Boolean,
        default: false
      }
    }
  };
</script>
