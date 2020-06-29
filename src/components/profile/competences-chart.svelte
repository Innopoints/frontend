<script>
  import colors from 'src/constants/profile/competence-colors.js';

  export let competences;
  export let items;

  $: maxCompetenceValue = Math.max(
    ...competences.map(comp => items.get(comp.id) || 1),
  );
</script>

<figure>
  <div class="bar-chart">
    {#each competences as competence, i (competence.id)}
      <div class="bar">
        <div
          style="flex-basis: {(items.get(competence.id) || 0) / maxCompetenceValue * 90}%;
                 background: rgb({colors[i]});"
          class="future"
          title="{competence.name}: {items.get(competence.id) || 0}"
        >
          <div style="flex-basis: 100%" class="present" />
        </div>
      </div>
    {/each}
  </div>

  <ul class="legend">
    {#each competences as competence, i (competence.id)}
      <li>
        <div style="background: rgb({colors[i]})" class="icon" />
        {competence.name.toLowerCase()}
      </li>
    {/each}
  </ul>
</figure>

<style src="../../../static/css/components/profile/competences-chart.scss"></style>
