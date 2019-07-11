## TEXT-FIELD

Text/Number simple/outlined inputs with items and error checking

**Wrapper props**

Property | Default | Description
--- | --- | ---
item | `''` | Is item used in the text-field. If `true` - `text/src` fields are required
right | `false` | Show item in the right or the left
text | `''` | Text to show
src | `''` | Image to show

**Outline props.** If you choose `outlined` - label and id are required

Property | Default | Description
--- | --- | ---
outline | `false` | Is text-field outlined
label | `''` | Text over the outlined input
id | `''` | Id of the outlined input

***Input props***

Property | Default | Description
--- | --- | ---
type | `'text'` | Type of the input, only `text` or `number` are supported
disabled | `false` |Disable the input
value |  | Value of the input. Pass from parent its state and control it
placeholder |  | Initial text in the input
pattern |  | Use pattern mask to control the value
error |  | Error to show if pattern is not working
name |  | Name of the input
min |  | Min value if the type is number
max |  | Max value if the type is number
focus |  | Function to handle focus
input |  | Function to handle input
blur |  | Function to handle blur



### Examples

```
<TextField
  id="input"
  outline
  pattern="[A-Za-z0-9_]{2,32}"
  error="error in the text"
  label="Text"
  item="img"
  src="/images/events/calendar.svg"
/>
```
