<script>
  import options from '@/constants/home/options';
  import Step from '@/components/home/option-step.svelte';
</script>

<section class="options">
  <h2>How to get innopoints?</h2>
  {#each options as option, i (option.title)}
    <div class="step">
      <Step {...option} />
    </div>
  {/each}
</section>
