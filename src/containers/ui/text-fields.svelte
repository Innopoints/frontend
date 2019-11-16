<script>
  import TextField from 'ui/text-field.svelte';
  import FormField from 'ui/form-field.svelte';
  import Card from 'ui/card.svelte';
</script>

<Card id="txts">
  <h1>Text Fields</h1>
  <div class="showcase">
    <TextField placeholder="Placeholder" />
  </div>
  <div class="showcase half">
    <TextField placeholder="Price" item right>
      <svg src="images/innopoint-sharp.svg" class="item" />
    </TextField>
    <TextField type="number" item>
      <span class="item">XXL</span>
    </TextField>
  </div>
  <div class="showcase">
    <TextField type="number" />
  </div>
  <div class="showcase">
    <TextField
        type="number"
        multiline
        id="description"
        placeholder="High-quality bulletproof fabric"
        cols="5" />
  </div>

  <hr />

  <h1>Form field</h1>

  <div class="showcase">
    <form>
      <FormField
          id="ff-1"
          title="Name"
          subtitle="This field is to write the name, so please do."
          required
      >
        <TextField id="ff-1" />
      </FormField>

      <FormField title="Type" subtitle="Write the type here, e.g. sweatshirt" id="ff-2">
        <TextField id="ff-2" />
      </FormField>

      <FormField title="Price" id="ff-3" required>
        <TextField id="ff-3" type="number" placeholder="Price" item right>
          <svg src="images/innopoint-sharp.svg" class="item innopoint" />
        </TextField>
      </FormField>

      <FormField title="Size" id="ff-4" required>
        <TextField id="ff-4" type="number" item>
          <span class="item">XXL</span>
        </TextField>
      </FormField>
    </form>
  </div>

  <hr />

  <div class="showcase">
    <TextField id="nothing" outline label="Label" />
    <TextField
        id="username"
        outline
        item
        label="Telegram"
        pattern="[A-Za-z0-9_](5, 32)"
        error="A username should contain from 5 to 32 symbols: a–z, 0–9, _.">
      <img alt="" src="images/ui-kit-page/at-sign.svg" class="item" />
    </TextField>
  </div>
</Card>
