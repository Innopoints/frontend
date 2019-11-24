<script>
  import { createEventDispatcher } from 'svelte';
  import rippleEffect from '@/components/ui/utils/ripple';

  let dispatch = createEventDispatcher();
  function changeTab(tab) {
    dispatch('change', tab);
  }
</script>

<nav class="tabs">
  <label on:click="{() => changeTab('T')}" class="tab" use:rippleEffect={'rgba(56, 120, 0, .25)'}>
    <input
        type="radio"
        name="tabs"
        value="timeline"
        checked
    />
    <!--TODO: Add ripple on buttons like in vue: v-ripple="'rgba(56, 120, 0, .25)'" -->
    <div class="icon">Timeline</div>
  </label>
  <label on:click="{() => changeTab('S')}" class="tab" use:rippleEffect={'rgba(56, 120, 0, .25)'}>
    <input type="radio" name="tabs" value="statistics" />
    <div class="icon">Statistics</div>
  </label>
  <label on:click="{() => changeTab('N')}" class="tab" use:rippleEffect={'rgba(56, 120, 0, .25)'}>
    <input type="radio" name="tabs" value="notifications" />
    <div class="icon">Notifications</div>
  </label>
</nav>
