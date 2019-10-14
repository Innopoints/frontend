<script>
  import { createEventDispatcher } from 'svelte';

  export let items = [];
  export let name;
  export let classname;
  export let selected = {};
  export let isLabel = false;
  export let isLabelGreen = false;
  export let labelPosition = 'right';
  export let labelClass = '';

  $: selectedId = selected.id || null;

  let dispatch = createEventDispatcher();

  const changeRadio = (item) => {
    selectedId = item.id;
    dispatch('change', item);
  };
</script>

<!--
<div :class="{'with-labels': withLabels, horizontal}" class="radio-group" role="group">
  <label
    v-for="(item, index) in items"
    :key="index"
    :class="{clickable: withLabels, colored: !!item.color}"
    class="radio"
  >
    <input
      :checked="selected === item"
      @change="select(item)"
      :name="name"
      type="radio"
    />
    <div :class="{white: isWhite(item)}" :style="style(item)" class="icon" />
    {{ (withLabels && item.label) ? item.label : '' }}
  </label>
</div>
-->

<div class:with-labels={isLabel} class={classname} role="group">
  {#each items as item, i (i)}
    <label class:clickable={isLabel} class={labelClass}>
      {#if isLabel}
        {#if labelPosition === 'left'}
          {#if isLabelGreen}
            <span class="label">{item.label}</span>
          {:else}
            {item.label}
          {/if}
        {/if}

        <div class="radio">
          <input
              on:change="{() => changeRadio(item)}"
              type="radio"
              name={name}
              checked="{selectedId === item.id}"
          >
          <div class="icon"></div>
        </div>

        {#if labelPosition === 'right'}
          {#if isLabelGreen}
            <span class="label">{item.label}</span>
          {:else}
            {item.label}
          {/if}
        {/if}

      {:else}
        <input on:change="{() => changeRadio(item)}" type="radio" name={name} checked={item.checked}>
        <div class="icon"></div>
      {/if}
    </label>
  {/each}
</div>
