<script>
  import Dropdown from 'ui/dropdown.svelte';
  import Button from 'ui/button.svelte';
</script>

<Dropdown classname="dropdown-shell steps-navigation" nowrap>
  <span slot="label" class="step-index"><span class="step">step </span>1</span>
  <span slot="label" class="step-name">general info</span>
  <Button href="/projects/new">
    <svg src="images/icons/rotate-ccw.svg" class="icon" />
    <span class="text">start over</span>
  </Button>
  <Button href="/projects/new?step=1">
    <span class="icon">1</span>
    <span class="text">general info</span>
  </Button>
  <Button href="/projects/new?step=2">
    <span class="icon">2</span>
    <span class="text">activities</span>
  </Button>
  <Button href="/projects/new?step=3">
    <span class="icon">3</span>
    <span class="text">moderators</span>
  </Button>
</Dropdown>
