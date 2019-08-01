<template>
  <div class="labeled text">
    <span class="label">Sizes</span>
    <div role="group" class="radio-options">
      <label class="chip-wrapper">
        <input type="radio" name="sizes" disabled />
        <div class="chip small">XS</div>
      </label>
      <label class="chip-wrapper">
        <input type="radio" name="sizes" checked />
        <div class="chip small">S</div>
      </label>
      <label class="chip-wrapper">
        <input type="radio" name="sizes" />
        <div class="chip small">M</div>
      </label>
      <label class="chip-wrapper">
        <input type="radio" name="sizes" />
        <div class="chip small">L</div>
      </label>
      <label class="chip-wrapper">
        <input type="radio" name="sizes" />
        <div class="chip small">XL</div>
      </label>
      <label class="chip-wrapper">
        <input type="radio" name="sizes" />
        <div class="chip small">XXL</div>
      </label>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Sizes',
  };
</script>

