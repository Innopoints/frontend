<script>
  import { getContext } from 'svelte';
  import { stores } from '@sapper/app';
  import { DropdownShell, Dropdown, Button, RadioGroup, Divider } from 'attractions';
  import { snackbarContextKey } from 'attractions/snackbar';
  import { getColorPickerStyles } from 'attractions/utils';
  import * as api from 'src/utils/api.js';

  const { session } = stores();

  export let value = null;
  export let colors;

  let colorInput = null;
  function openColorInput() {
    colorInput.click();
  }

  let colorDebounce = null;
  function addColor(e) {
    const colorValue = e.target.value.toUpperCase();

    if ($colors.find(thatColor => thatColor.value === colorValue) != null) {
      return;
    }

    if (colorDebounce != null) {
      clearTimeout(colorDebounce);
    }

    colorDebounce = setTimeout(async () => {
      try {
        const payload = { value: colorValue };
        await api.json(api.post(
          '/colors',
          { data: payload, csrfToken: $session.account.csrf_token },
        ));
        $colors.push(payload);
        $colors = $colors;
        colorDebounce = null;
      } catch (e) {
        showSnackbar({ props: { text: 'Couldn\'t create a color, try reloading the page' } });
        console.error(e);
      }
    }, 200);
  }

  const showSnackbar = getContext(snackbarContextKey);
</script>

<div class="color-picker">
  <DropdownShell let:toggle>
    <Button on:click={toggle}>
      choose a color
      <div
        class="selected-color"
        style={
          `display: ${value != null ? 'block' : 'none'};`
          + `${value != null ? getColorPickerStyles(value) : ''}`
        }
      />
    </Button>
    <Dropdown>
      <RadioGroup
        color
        name="color-choices"
        class="color-choices"
        items={$colors}
        bind:value
        on:change
      />
      <Divider />
      <Button on:click={openColorInput}>
        <svg src="static/images/icons/plus.svg" class="mr" />
        add another color
      </Button>
      <input
        type="color"
        bind:this={colorInput}
        class="new-color-picker"
        on:change={addColor}
      >
    </Dropdown>
  </DropdownShell>
</div>

<style src="../../../../static/css/components/products/new/color-picker.scss"></style>
