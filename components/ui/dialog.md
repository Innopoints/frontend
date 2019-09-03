# Dialog

Dialogs inform users about a task and can contain critical information, require decisions, or involve multiple tasks.

## Props

Prop      |Type     | Default | Description
---       |---      | ---     | ---
title     | String  |         | The dialog's title (if slot not provided)
text      | String  |         | The text content of the dialog (if slot not provided)
danger    | Boolean | `false` | Applies the danger theme
notice    | Boolean | `false` | Applies the notice theme
actions   | Array   | `[]`    | Array of objects used to render the action buttons (with `btn` CSS class applied). Each object should contain the `text` property (button's text content) and `onclick` property with a function to be called when the button is clicked. Extra properties (e.g.: `class`) are passed directly to the button.

## Slots

- default: The content of the dialog's text. Supersedes the `text` prop.
- `title`: The dialog's title. Supersedes the `title` prop.
- `actions`: The actions section of the dialog. Supersedes the `actions` prop.

## Events

- `close`: emitted when the close button is clicked.
