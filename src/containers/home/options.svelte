<script>
  import options from 'src/constants/home/options.js';
  import OptionStep from 'src/components/home/option-step.svelte';
</script>

<section class="options">
  <h2>How to get innopoints?</h2>
  {#each options as option (option.title)}
    <OptionStep {...option} />
  {/each}
</section>

<style src="../../../static/css/containers/home/options.scss"></style>
