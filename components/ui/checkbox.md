## CHECKBOX

Checkbox is only for one-time usage. For the group
of checkboxes use `CheckboxGroup`

Property | Required | Default | Description
--- | --- | --- | ---
checked | `yes` | – | *Boolean* type value passed from the parent (usually its state).
click | `yes` | - | *Function* that changes the `checked` value.
label | `no` | `''` | *String* that will be printed with the checkbox
name | `no` | `''` | *String* - name of the input

### Examples

```
<checkbox
  :checked="check"
  :click="handleCheckbox"
  name="check"
  label="with label"
/>
```

```
data() {
  return {
    check: true,
  };
},
methods: {
  handleCheckbox(e) {
    this[e.target.name] = !this[e.target.name];
  }
}
```
