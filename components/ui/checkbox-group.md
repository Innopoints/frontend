## CHECKBOX–GROUP

Checkbox is only for one-time usage. For the group
of checkboxes use `CheckboxGroup`

Property | Required | Description
--- | --- | ---
items | `yes` | *Array* of objects ```{ checked: true/false, label: 'some text'}```
click | `yes` | *Function* that receives new array of `items` and changes the state.


### Examples

```
<checkbox-group
  :items="items"
  :click="handleCheckboxChange"
/>
```
```
const items = [
  {
    checked: true,
    label: 'checkbox #1'
  },
  {
    checked: false,
    label: 'checkbox #2'
  },
  {
    checked: true,
    label: 'checkbox #3'
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
