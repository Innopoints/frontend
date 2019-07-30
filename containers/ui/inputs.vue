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

      <TextField
        id="input2"
        multiline
        placeholder="Let's talk about your problems"
      />
    </div>
    <hr />

    <div class="showcase">
      <FormField
        title="name"
        subtitle="This is a subtitle for some title"
      >
        <TextField
          placeholder="Some placeholder"
        />
      </FormField>
    </div>
    <div class="showcase">
      <FormField
        required
        title="name"
        subtitle="This is a subtitle for some title"
      >
        <TextField
          id="input2"
          outline
          label="Text"
        />
      </FormField>
    </div>
  </Card>
</template>

<script>
  import Card from '../../components/ui/card';
  import TextField from '../../components/ui/text-field';
  import FormField from '../../components/ui/form-field';

  export default {
    components: {
      FormField,
      TextField,
      Card,

    },
    data() {
      return {

      };
    },
  };
</script>
