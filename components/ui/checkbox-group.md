## CHECKBOX–GROUP

Property | Required | Description
--- | --- | ---
value | `yes` | *Array* of objects ```{ checked: true/false, label: 'some text'}```
round | `no` | circle instead of square
colored | `no` | item object has color property


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
