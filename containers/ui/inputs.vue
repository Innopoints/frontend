<template>
  <Card class="inputs">
    <h1>Text Field</h1>
    <div class="showcase">
      <TextField
        placeholder="Some placeholder"
      />

      <TextField
        item="text"
        text="XXL"
      />

      <TextField
        id="input"
        outline
        pattern="[A-Za-z0-9_]{2,32}"
        error="error in the text"
        label="Text"
        item="img"
        src="/images/events/calendar.svg"
      />

      <TextField
        id="input1"
        outline
        label="Text"
      />
    </div>
  </Card>
</template>

<script>
  import Card from '../../components/ui/card';
  import TextField from '../../components/ui/text-field';

  export default {
    components: {
      TextField,
      Card

    },
    data() {
      return {

      };
    }
  };
</script>
