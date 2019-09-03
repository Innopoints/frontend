## RADIO–GROUP

### Props

Property | Required | Type | Default | Description
--- | --- | --- | --- | ---
name | yes | String | | name for the radio-group
items | yes | Array | | item objects
with-labels | no | Boolean | `false` | display the labels or not
value | no | Object | `null` | the currently selected item

***Item object*** (each of the objects in the `items` array must conform to the following structure)

Property | Type | Description
--- | --- | ---
label | String | only displayed if `with-labels=true`
color | String | radio button color (must be CSS-compatible). Transparent if not provided

### Events:

- `input`: fired when the selected option changes
  - payload: the object representing the selected item 

### Examples

```html
<radio-group
  :items="items"
  v-model="selected"
  name="radio2"
  with-labels
/>
```

```js
data() {
  return {
    items: [
      {
        label: 'radio #1',
        color: 'pink',
      },
      {
        label: 'radio #2',
        color: 'purple',
      },
      {
        label: 'radio #3',
        color: 'violet',
      },
    ],
    selected: null,
  };
}
```
