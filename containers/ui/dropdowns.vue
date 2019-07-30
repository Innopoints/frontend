<template>
  <Card>
    <h1>Dropdowns</h1>
    <div class="showcase vertical">
      <Dropdown label="Open me pls">
        <h2>
          Does somebody want a pizza?
          <Button label="Buy me a pizza" outline />
        </h2>
      </Dropdown>
      <Dropdown right label="Open me pls">
        <Button label="Click'n me" filled />
      </Dropdown>
    </div>
  </Card>
</template>

<script>
  import Card from '../../components/ui/card';
  import Dropdown from '../../components/ui/dropdown';
  import Button from '../../components/ui/button';

  export default {
    components: {
      Button,
      Dropdown,
      Card,
    },
  };
</script>
