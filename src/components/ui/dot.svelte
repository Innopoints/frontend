<script>
  export let small = false;
  export let attention = false;
  export let active = false;

  $: classes = [
    small && 'small',
    !attention ? (!active ? 'new' : 'active') : 'attention',
  ];
</script>

<span class="dot {classes.join(' ')}" />
