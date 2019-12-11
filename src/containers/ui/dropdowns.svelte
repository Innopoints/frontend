<script>
  import Dropdown from 'ui/dropdown.svelte';
  import Card from 'ui/card.svelte';
  import Button from 'ui/button.svelte';
</script>

<Card id="dropdowns">
  <h1>Dropdowns</h1>
  <div class="showcase vertical">
    <Dropdown label="open dropdown">
      great now close me
      <br />
      great now close me
      <br />
      great now close me
      <br />
      great now close me
    </Dropdown>
    <Dropdown label="right dropdown" isRight nowrap>
      <Button isFilled>woo alRIGHT</Button>
    </Dropdown>
    <Dropdown dropdownclass="dropdown info-bubble" btnclass="round" chevron={false} isRight>
      <svg slot="label" src="images/icons/help-circle.svg" class="icon" />
      Some event organizers prefer to collect those to ease communication.
      Adding one here will save you the typing for those
      occasions (you will still be able to control what you send).
    </Dropdown>
  </div>
</Card>
