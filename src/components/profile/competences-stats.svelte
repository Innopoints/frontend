<script>
  import Button from 'ui/button.svelte';
  import stats from '@/constants/profile/competences-stats';
</script>

<div class="stat competences">
  <header>
    <svg src="images/icons/bar-chart-2.svg" class="icon" />
    Developed competences
  </header>
  <figure>
    <div class="bar-chart">
      {#each stats as stat (stat.id)}
        <div class="bar">
          <a
              href="{'/projects?comp=' + stat.id}"
              style="{'flex-basis: ' + stat.future + '%'}"
              class="future"
          >
            <div style="{'flex-basis: ' + stat.now + '%'}" class="present" />
          </a>
        </div>
      {/each}
    </div>

    <ul class="legend">
      {#each stats as stat (stat.id)}
        <li>
          <Button href="{'/projects?comp=' + stat.id}">
            <div style="{'background: ' + stat.color}" class="icon" />
            {stat.name}
          </Button>
        </li>
      {/each}
      <p>click a competence to find opportunities for development</p>
    </ul>
  </figure>
</div>
