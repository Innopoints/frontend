# Chip

Chips are compact elements that represent an input, attribute, or action. They are commonly used as radio or checkbox input elements.

## Props

Prop      |Type     | Default | Description
---       |---      | ---     | ---
value     | Boolean | `false` | Sets the input's `checked` state
multiple  | Boolean | `false` | Whether multiple chips can be selected or exactly one
disabled  | Boolean | `false` | Disables clicking the chip and gives it the disabled style
small     | Boolean | `false` | Decreases the size of the chip
text      | String  |         | Text to display in the chip (if default slot not provided)
outline   | Boolean | `false` | Set the outline style
name      | String  |`"group"`| The name provided to input elements to group them so that only one radio button can be selected at a time.

## Slots

- `default`: The content of the chip

## Events

- `input`: triggered when chip is clicked and its state changes. Payload is the new "checked" value.

_Tip: use `v-model` to combine `input` event with `value` prop_

## Examples:

### Size picker

```html
<div>
  <Chip disabled small>XS</Chip>
  <Chip>S</Chip>
  <Chip>M</Chip>
  <Chip>L</Chip>
</div>
```

### Filters

```html
<div>
  <Chip multiple outline>Shirts</Chip>
  <Chip multiple outline>Mugs</Chip>
  <Chip multiple outline>Stationery</Chip>
  <Chip multiple outline>Stickers</Chip>
</div>
```
