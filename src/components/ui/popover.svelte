<script>
  export let classname = '';
  export let popoverclass = '';
</script>

<div class="popover-container {classname}">
  <slot name="handle" />
  <slot name="popover">
    <div class="popover {popoverclass}">
      <slot name="popover-content" />
    </div>
  </slot>
</div>
