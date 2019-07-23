## LABELED

Component to render some text with the label in
the top and with some icon

Property | Required | Type | Description
--- | --- | --- | ---
label | yes | String | Text to print as a label
icon | no | String | Path to the svg icon that will be rendered left from the text

### Examples

**Simple labeled element**

```html
<Labeled label="Label">Some text</Labeled>
```

**With icon**

```html
<Labeled label="Label" icon="/images/events/plus-circle.svg">Some text</Labeled>
```
