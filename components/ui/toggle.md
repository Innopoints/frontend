## TOGGLE

Simple switch (toggle) component

Property | Required | Default | Description
--- | --- | --- | ---
checked | `yes` | – | *Boolean* type value passed from the parent (usually its state).
click | `yes` | - | *Function* that changes the `checked` value.
label | `no` | `''` | *String* that will be printed with the toggle
name | `no` | `''` | *String* - name of the input

### Examples

```
<Toggle
  :checked="check"
  :click="handleToggle"
  name="toggle"
  label="with label"
/>
```

```
data() {
  return {
    toggle: true,
  };
},
methods: {
  handleToggle(e) {
    this[e.target.name] = !this[e.target.name];
  }
}
```
