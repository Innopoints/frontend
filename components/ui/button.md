## BUTTON

Buttons can be represented as links or as buttons. Here is
the full list of possible properties:

Property | Default | Description
--- | --- | ---
link | `false` | Create a button-link component for the navigation. Without any other props - `nuxt-link`
away | `false` | If it is a button-link - then *away* prop makes it `<a target="_blank">`
href | `'#'` | Where button-link should navigate
label | `''` | Text in the button
img | `''` | SVG (!) image to show
click | `null` | Function that handles the click on the button.
disabled | `false` | Is button disabled
outline | `false` | Border without the fill
filled | `false` | Green fill of the button
danger | `false` | Main color - red
round | `false` | Rounded button
normal | `false` | Gray background
badge | `false` | Red circle with the svg image - notification

### Examples

**Outline button with text, icon and click-handler**

```html
<Button
  :click="handle"
  round
  outline
  label="with label"
  img="/images/events/calendar.svg"
/>
```

```
methods: {
  handle() {
    alert('clicked');
  }
}
```

**Danger button-link with external href**

```html
<Button
  link
  away
  href="http://example.com"
  label="danger"
  danger
/>
```
