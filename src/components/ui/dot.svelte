<script>
  export let small = false;
  export let attention = false;
  export let active = false;
  export let classname = '';

  $: classes = [
    classname && classname,
    small && 'small',
    !attention ? (!active ? 'new' : 'active') : 'attention',
  ].filter(v => v !== false);
</script>

<span class="dot {classes.join(' ')}" />
