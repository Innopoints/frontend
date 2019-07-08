<template>
  <div :class="open && 'open'" class="dropdown-shell off-tb">
    <div @click="toggleDropdown" class="filter spots">
      <span>vacant spots</span>
      <div class="counter hide-mb">
        <button id="spots-dec" @click="editSpots(false)" />
        <span id="spots-count">{{ spots }}</span>
        <button id="spots-inc" @click="editSpots(true)" />
      </div>
    </div>
    <div class="dropdown shadow-2">
      <div class="counter">
        <button id="spots-drop-dec" @click="editSpots(false)" />
        <span id="spots-drop-count">{{ spots }}</span>
        <button id="spots-drop-inc" @click="editSpots(true)" />
      </div>
      <img
        @click="toggleDropdown"
        src="/images/events/x.svg"
        sizes="(min-width: 640px) 24px, 18px"
        class="drop-close"
      />
    </div>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex';

  export default {
    name: 'Spots',
    data() {
      return {
        open: false
      };
    },
    computed: {
      ...mapState({
        spots: state => state.events.spots
      })
    },
    methods: {
      ...mapActions({
        changeSpots: 'events/changeSpots'
      }),
      editSpots(isInc) {
        let changed = isInc ? this.spots + 1 : this.spots - 1;
        if(changed > 0) this.changeSpots(changed);
      },
      toggleDropdown() {
        this.open = !this.open;
      }
    }
  };
</script>
