## TOGGLE

Simple switch (toggle) component

Property | Required | Default | Description
--- | --- | --- | ---
checked | `yes` |  | *Boolean* type value passed from the parent (usually its state).
click | `yes` |  | *Function* that changes the `checked` value.
label | `no` | `''` | *String* that will be printed with the toggle
name | `no` | `''` | *String* - name of the input
two-state | `no` | `false` | *Boolean* type makes useless prop *label* but then you need to specify `first` and `second` properties
first | `no` | `''` | *String* - label for the first state
second | `no` | `''` | *String* - label for the second state

### Examples

**Single toggle**

```html
<Toggle
  :checked="check"
  :click="handleToggle"
  name="toggle"
  label="with label"
/>
```
**Two–stated toggle**

```html
 <Toggle
  :checked="check"
  :click="handleToggle"
  name="toggle"
  two-state
  first="state one"
  second="state two"
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
