## RADIO–GROUP

Property | Required | Default | Description
--- | --- | --- | ---
name | `yes` | | *String* name for the radio-group
items | `yes` | | *Array* of item objects
click | `yes` | | *Function* that receives new array of `items` and changes the state.
with-labels | `no` | `false` | *Boolean*: print labels or not
with-colors | `no` | `false` | *Boolean*: make radio buttons colorful

***Item object*** — one of the items

Property | Description
--- | --- 
checked | *Boolean*: initial checked state (only 1 can be true)
label | *String* that prints only if `with-labels: true`
color | *String* color (HEX, RGBA, doesn't matter) that applies if `with-colors: true`

### Examples

```html
<checkbox-group
  :items="items"
  :click="handleCheckboxChange"
  with-labels
  with-colors
  name="radio2"
/>
```

```js
const items = [
  {
    checked: true,
    label: 'radio #1',
    color: 'pink'
  },
  {
    checked: false,
    label: 'radio #2',
    color: 'purple'
  },
  {
    checked: true,
    label: 'radio #3',
    color: 'violet'
  },
]
```

```
data() {
  return {
    items
  };
},
methods: {
  handleCheckboxChange(newItems) {
    this.items = newItems;
  }
}
```
