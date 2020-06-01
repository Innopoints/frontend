<script>
  let _class = null;
  export { _class as class };
  export let text = null;
</script>

<hr class={_class} data-text={text} />

<style lang="scss">
  @import "_attractions-theme.scss";

  hr {
    border: 0 solid $light-contrast;
    border-top-width: 0.0625em;
    margin-top: 1em;
    width: 100%;

    &[data-text] {
      position: relative;
      overflow: visible;

      &::after {
        content: attr(data-text);
        background: #fff;
        padding: 0 .4em;
        position: absolute;
        top: 0;
        left: 50%;
        transform: translate(-50%, -55%);
        font-size: .85em;
      }
    }
  }
</style>
