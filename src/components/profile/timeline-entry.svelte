<script>
  import Dot from 'ui/dot.svelte';
  import Button from 'ui/button.svelte';

  export let type;
  export let important = false;
  export let action = {
    date: '',
    status: '',
    application: {},
    item: {},
  };
</script>

<div class="entry">
  <div class="icon">
    {#if type === 'V'}<svg src="images/icons/file.svg" />{/if}
    {#if type === 'P'}<svg src="images/icons/shopping-bag.svg" />{/if}
    {#if type === 'M'}<svg src="images/icons/chevrons-up.svg" />{/if}
    {#if type === 'C'}<svg src="images/icons/package.svg" />{/if}
  </div>

  <div class="content">
    {#if type === 'V'}
      <div class="lb">Applied for</div>
      <div class="lb">{action.application.name} on</div>
      <a href="{'/project/' + action.application.project.link}" class="lb">
        {action.application.project.name}
      </a>
      {#if action.application.project.status === 'C'}
        <div class:bad="{action.application.status === 'R'}" class:good="{action.application.status === 'A'}" class="status">
          application
          {{
          A: 'approved',
          P: 'awaiting approval',
          R: 'rejected',
          }[action.application.status]}
        </div>
      {:else if action.application.project.status === 'F'}
        <div class="status good">
          1337 <svg src="images/innopoint-sharp.svg" /> gained{!action.application.comment ? ', leave feedback to claim' : ''}
        </div>
        {#if !action.application.comment}
          <Button filled classname="mt">leave feedback</Button>
        {/if}
      {/if}
      <time>
        {action.date}
        {#if important}<Dot />{/if}
      </time>
    {:else if type === 'P'}
      <div class="lb">Purchased the</div>
      <a href="{'/store/' + action.item.id}" class="lb">
        "{action.item.name}" {action.item.type}
      </a>
      <div class:bad="{action.status === 'R'}" class:good="{action.status === 'A'}" class="status">
        {{
          W: 'item is on its way to 319',
          R: 'purchase rejected',
          A: 'item ready for pickup at 319',
        }[action.status]}
      </div>
      <time>
        {action.date}
        {#if important}<Dot />{/if}
      </time>
    {:else if type === 'M'}
        <div class="lb">Granted moderator rights on</div>
        <a href="{'/project/' + action.project.link}" class="lb">
          {action.project.name}
        </a>
        <time>
          {action.date}
          {#if important}<Dot />{/if}
        </time>
    {:else if type === 'C'}

      <div class="lb">Created the project</div>
      <a href="{'/project/' + action.project.link}" class="lb">
        {action.project.name}
      </a>
      <div class:bad="{action.status === 'R'}" class:good="{action.status === 'A'}" class="status">
        {{
          W: 'project awaiting final review',
          R: 'activity statistics sent back for corrections',
          A: 'activities reviewed & approved',
        }[action.status]}
      </div>
      {#if action.status === 'R'}
        <Button filled classname="mt">make corrections</Button>
      {/if}

      <time>
        {action.date}
        {#if important}<Dot />{/if}
      </time>
    {/if}
  </div>
</div>
