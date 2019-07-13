# Carousel

A slideshow component for cycling through images a carousel.

## Props

Prop          |Type     | Default | Description
---           |---      | ---     | ---
images        | Array   |         | Array of strings with URLs of the pictures
hideControls  | Boolean | `false` | Hides the "previous" and "next" buttons
hideIndicators| Boolean | `false` | Hides the indicators/selectors showing current image index
interval      | Number  |         | The interval (in milliseconds) to cycle an item. If not provided (or zero), carousel will not automatically cycle

## Examples:

### Basic usage

```html
<div style="width: 600px;">
  <Carousel :images="[
    '/images/landing/voxel-city-tablet.png',
    '/images/landing/event-organizer.png',
    '/images/landing/umbrella.png'
  ]" />
</div>
```

### Slideshow without controls

```html
<div style="width: 600px;">
  <Carousel 
    :images="[
      '/images/landing/voxel-city-tablet.png',
      '/images/landing/event-organizer.png',
      '/images/landing/umbrella.png'
    ]"
    hide-controls
    hide-indicators
    interval="6000"
  />
</div>
```
