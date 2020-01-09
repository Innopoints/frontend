<script>
  export let classname = '';

  let closeCallback = null;
  function panelController(event) {
    if (closeCallback !== null && closeCallback !== event.detail.closeCallback) {
      closeCallback();
    }
    closeCallback = event.detail.closeCallback;
  }
</script>

<ul class="accordion {classname}">
  <slot {panelController}></slot>
</ul>
