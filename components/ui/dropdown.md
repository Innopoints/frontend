# Dropdown

Also called _select fields_, dropdown components are used for collecting user provided information from a list of options

## Props

Prop      |Type     | Default | Description
---       |---      | ---     | ---
items     | Array   |         | The list of options as strings or objects.
value     | String\|Object |   | The currently selected item
label     | String  |         | Text to display on the dropdown
chevron   | Boolean | `true`  | Adds the chevron icon
right     | Boolean | `false` | Aligns items to the right
return-object| Boolean|`false`| Returns (to `v-model`) the selected object as it was given in `items`. Otherwise, returns the text if the items were a string, and _item.value_ if they were objects.

If the item is in object format, it must have at least the following 2 properties:
```json
{
  "text": "",  // String
  "value": {}  // Any type
}
```

## Slots

- **default**: The entire dropdown content. If used, the _item_ slot, _items_, _value_, _return-object_ props, and the _input_ event become useless.
- **label**: The content of the dropdown's label. Overrules the `label` prop
- **item**: Defines custom item appearance
  - scope props: 
    ```json
    {
      "item": {
        "text": "",
        "value": {}
      },
      "index": 0
    }
    ``` 

## Methods

- **toggle**: Toggles the _open_ state of the dropdown

## Events

- **input**: emitted when an item is selected.
  - payload: selected _item_

_Tip: use `v-model` to combine `input` event with `value` prop_
