<script>
  export let small;
  export let attention;
  export let active;

  $: classes = [
    small && 'small',
    !attention ? (!active ? 'new' : 'active') : 'attention',
  ];
</script>

<span class="dot {classes.join(' ')}" />
