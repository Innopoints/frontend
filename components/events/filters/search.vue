<template>
  <div id="search-toggle" @click="changeMobileCollapsed" class="search">
    <img
      src="/images/events/search.svg"
      srcset="/images/events/search-mobile.svg 18w, /images/events/search.svg 24w"
      sizes="(min-width: 640px) 24px, 18px"
    />
    <input
      :value="search"
      @change="(e) => changeSearch(e.target.value)"
      type="text"
      name="search"
      placeholder="Type anything to search"
    />
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex';

  export default {
    name: 'Search',
    computed: {
      ...mapState({
        search: state => state.events.filters.search,
        mobileCollapsed: state => state.events.mobileCollapsed,
      }),
    },
    methods: {
      ...mapActions({
        changeSearch: 'events/changeSearch',
        toggleMobileCollapsed: 'events/toggleMobileCollapsed',
      }),
      changeMobileCollapsed() {
        if(!this.mobileCollapsed) {
          this.toggleMobileCollapsed();
        }
      },
    },
  };
</script>
