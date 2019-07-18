## TIMELINE

Component to render some events flow during some period.
Consists of the Timeline container and the TimelineEntry
component. First one awaits the components as the slot,
and TimelineEntry can have as a slot some html content.

**Timeline properties**

Property | Default | Description
--- | --- | ---
load | `false` | Show *load more* in the end of a timeline
handleLoad | | Function to handle click on the load button

**TimelineEntry**  properties

Key | Default Value | Description
--- | --- | ---
important | `false` | Make the the icon of the timeline object orange
icon | `'/images/events/calendar.svg'` | Icon `String` of the path to the svg icon to render in the circle

### Examples

```
<Timeline 
  :handle-load="handleLoad" 
  load 
>
  <TimelineEntry>
    Here are we
  </TimelineEntry>
  <TimelineEntry important>
    Here are we again
  </TimelineEntry>
  <TimelineEntry icon="/images/events/x.svg">
    And again
  </TimelineEntry>
  <TimelineEntry important icon="/images/events/plus-circle.svg">
    Till the end
  </TimelineEntry>
</Timeline>
```


```
methods: {
  handleLoad() {
    alert('load more');
  }
}
```
