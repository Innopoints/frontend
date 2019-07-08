<template>
  <div id="search-toggle" class="search">
    <img
      src="/images/events/search.svg"
      srcset="/images/events/search-mobile.svg 18w, /images/events/search.svg 24w"
      sizes="(min-width: 640px) 24px, 18px"
    />
    <input type="text" name="search" placeholder="Type anything to search" />
  </div>
</template>

<script>
  export default {
    name: 'Search'
  };
</script>
