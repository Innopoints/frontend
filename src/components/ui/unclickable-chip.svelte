<script>
  export let classname = '';
  export let small = false;
  export let outline = false;

  export let value = null;
</script>

<div class:small class:outline class="chip unclickable {classname}">
  <slot>{value}</slot>
</div>
