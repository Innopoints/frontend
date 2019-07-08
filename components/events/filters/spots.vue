<template>
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
</template>

<script>
  export default {
    name: 'Spots'
  };
</script>
