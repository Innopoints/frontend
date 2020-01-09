<script>
  export let classname = '';
  export let small = false;
  export let pending = false;
  export let attention = false;
  export let active = false;

  if (pending + attention + active > 1) {
    console.error('A dot may be only one of: pending, attention, active.');
  }
</script>

<span class:small class:pending class:active class:attention class="dot {classname}" />
