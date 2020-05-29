<script>
  export let hidden = false;
</script>

<div class="badge" class:hidden>
  <slot />
</div>

<style lang="scss">
  @import "_attractions-theme.scss";

  $badge-bg: lighten($danger, 25%);

  .badge {
    position: relative;

    &::after {
      position: absolute;
      top: -3px;
      right: -2px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: $badge-bg;
      box-shadow: $shadow-raised;
      content: "";
    }

    &.hidden::after {
      display: none;
    }

    .icon {
      display: block;
    }
  }
</style>
