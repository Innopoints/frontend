<template>
  <div class="dropdown-shell">
    <div class="filter competences">
      <span class="competences-title drop-text-open">competences</span>
      <img src="/images/events/chevron-down.svg" class="dropdown-chevron" />
    </div>
    <div class="dropdown shadow-2 right-edge">
      <div class="space-between center">
        <button>clear all</button>
        <img
          src="/images/events/x.svg"
          sizes="(min-width: 640px) 24px, 18px"
          class="drop-close"
        />
      </div>
      <fieldset>
        <label>
          <input id="comp-creativity" type="checkbox" checked="checked" />
          <div class="styled-checkbox" />
          creativity
        </label>
        <label>
          <input id="comp-crit-think" type="checkbox" checked="checked" />
          <div class="styled-checkbox" />
          critical thinking
        </label>
        <label>
          <input id="comp-leadership" type="checkbox" checked="checked" />
          <div class="styled-checkbox" />
          leadership
        </label>
        <label>
          <input id="comp-conflict-aversion" type="checkbox" checked="checked" />
          <div class="styled-checkbox" />
          conflict aversion
        </label>
        <label>
          <input id="comp-communication" type="checkbox" checked="checked" />
          <div class="styled-checkbox" />
          communication
        </label>
        <label>
          <input id="comp-other" type="checkbox" checked="checked" />
          <div class="styled-checkbox" />
          some other skill
        </label>
      </fieldset>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Competences'
  };
</script>
