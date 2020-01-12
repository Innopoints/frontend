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
    <TextField placeholder="Price" isWithItem isItemRight>
      <svg src="/images/innopoint-sharp.svg" class="item innopoint" />
    </TextField>
    <TextField type="number" isWithItem>
      <span class="item">XXL</span>
    </TextField>
  </div>
  <div class="showcase">
    <TextField type="number" />
  </div>
  <div class="showcase">
    <TextField
      id="description"
      placeholder="High-quality bulletproof fabric"
      multiline
    />
  </div>

  <hr />

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
        <TextField id="ff-3" type="number" placeholder="Price" isWithItem isItemRight>
          <svg src="/images/innopoint-sharp.svg" class="item innopoint" />
        </TextField>
      </FormField>

      <FormField title="Size" id="ff-4" required>
        <TextField id="ff-4" type="number" isWithItem>
          <span class="item">XXL</span>
        </TextField>
      </FormField>
    </form>
  </div>

  <hr />

  <div class="showcase">
    <TextField id="nothing" isOutline label="Label" />
    <TextField
      id="username"
      isOutline
      isWithItem
      label="Telegram"
      pattern="[A-Za-z0-9_]+"
      minlength={5}
      maxlength={32}
      error="A username should contain from 5 to 32 symbols: a–z, 0–9, _.">
      <svg src="/images/icons/at-sign.svg" class="item" />
    </TextField>
  </div>
</Card>
