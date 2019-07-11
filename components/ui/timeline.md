## TIMELINE

Component to render some events flow during some period

Property | Def/Req | Description
--- | --- | ---
items | **Required** | Array of timeline objects (listed below)
load | `false` | Show *load more* in the end of a timeline
handleLoad | | Function to handle click on the load button

**Items array** consist of **item** objects. Here are the key-values of the object

Key | Default Value | Description
--- | --- | ---
content | `''` | Text to show next to the icon
important | `false` | Make the the icon of the timeline object orange
icon | | Icon `String` of the path to the svg icon to render in the circle

### Examples

```
<Timeline 
  :items="items" 
  :handle-load="handleLoad" 
  load 
/>
```

```
const items = [
  {},
  {
    content: 'Some content here. This is just a long story'
  },
  {
    important: true,
    content: 'Important! Listen to my story about the innopoints project. Long-long time ago...'
  },
  {
    content: 'Simple new icon',
    icon: '/images/events/x.svg'
  },
  {
    important: true,
    content: 'Full timeline object',
    icon: '/images/events/plus-circle.svg'
  }
];
```

```
data() {
  return {
    items
  };
},
methods: {
  handleLoad() {
    alert('load more');
  }
}
```
