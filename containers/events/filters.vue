<template>
  <div class="container filters">
    <div class="ellipse filters-collapsed">
      <div id="search-toggle" class="search">
        <img
          src="/images/events/search.svg"
          srcset="/images/events/search-mobile.svg 18w, /images/events/search.svg 24w"
          sizes="(min-width: 640px) 24px, 18px"
        />
        <input type="text" name="search" placeholder="Type anything to search" />
      </div>

      <div class="dropdown-shell off-tb">
        <div class="filter spots">
          <span>vacant spots</span>
          <div class="counter hide-mb">
            <button id="spots-dec" />
            <span id="spots-count">3</span>
            <button id="spots-inc" />
          </div>
        </div>
        <div class="dropdown shadow-2">
          <div class="counter">
            <button id="spots-drop-dec" />
            <span id="spots-drop-count">3</span>
            <button id="spots-drop-inc" />
          </div>
          <img
            src="/images/events/x.svg"
            sizes="(min-width: 640px) 24px, 18px"
            class="drop-close"
          />
        </div>
      </div>

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

      <div class="dropdown-shell no-border">
        <div class="filter date-range">
          <img
            src="/images/events/calendar.svg"
            srcset="/images/events/calendar-mobile.svg 18w, /images/events/calendar.svg 24w"
            sizes="(min-width: 640px) 22px, 18px"
            class="drop-text-open"
          />
          <span class="hide-mb">select date range</span>
          <img src="/images/events/chevron-down.svg" class="hide-mb dropdown-chevron" />
        </div>
        <div class="dropdown shadow-2 right-edge">
          <span>start date</span>
          <span>end date</span>
          <img
            src="/images/events/x.svg"
            sizes="(min-width: 640px) 24px, 18px"
            class="drop-close"
          />
        </div>
      </div>

      <div class="show-filters no-border">
        <img
          src="/images/events/filter.svg"
          srcset="/images/events/filter-mobile.svg 18w, /images/events/filter.svg 24w"
          sizes="(min-width: 640px) 24px, 20px"
        />
        <span>filters</span>
      </div>
    </div>
    <div class="ordering">
      <span>Order:</span>
      <div id="collapse-toggle">
        <img src="/images/events/order.svg" />
        <span>collapse ordering options</span>
      </div>
      <div class="order-grid">
        <span class="order">most valuable first</span>
        <span class="order active">most recent first</span>
        <span class="order">least valuable first</span>
        <span class="order">least recent first</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Filters'
  };
</script>

<style src="../../static/css/events/filters.css" scoped />
<style src="../../static/css/events/ordering.css" scoped />

