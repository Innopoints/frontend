# CONVENTIONS

### Idea behind

To create a good ui-component system, we need to follow some conventions to keep it understandable and easy to use without deep code researching.

### Logic and Styling

UI-component is about logic, not about the styling. When we imagine dropdown, we should think that it has no styles at all, but it could easily be opened by clicking on the trigger-button, closed with the same button and by clicking outside this dropdown. The last point is why it should be classified as UI-component – it has logic.

Think about new project with different design and different markup – that is a killer of style-oriented UI systems. If the markup has even one class different from classes assigned by the system, it will make front-ender rewrite styles which is a waste of time and money.

All of what is said above lead us to these conventions.

## Naming

Since we use *Svelte* as a main framework, it has some requirements that we cannot omit. In Vue, for examples, conventions would be a little bit different, but remember: Svelte-components can be used in each framework, and it's better to create it good in a first place.

### Classes

To make everything be fully-customized, each component's DOM-element that could be potentially styled, it should have a class name as a prop:
* `classname` as a name of the main container (if any)
* `headclass, triggerclass, (*)class` without casing is for any DOM element inside the container

Enabling some predefined class is performed by boolean properties. Here are the stages how to enable some class with the button examle:
* `export let isRound` in the *script* at the top of the component
* `<button class:round={isRound} class={classname} />` in the DOM element, where *isRound* enables predefined class and *classname* is a customized class.

### Logic props

Pass two main props to control the component
* `value` should be changeable as from the inside of the very component, as from the outside parent. *Value* can be anything: boolean, object or array – doesn't matter if the component itself specifies what should it be. **Has to be reactive**
* `items` array is needed for group-component such as checkbox-group or radio-group. It specifies predefined data which will be populated after.

### Other props

All other props can be named by their logical purpose. For example, switch's *twoState* prop affects *#if* block and slightly changes the markup, but its name is fully understandable.

**DOM attributes** should also be passed as props due to Svelte. For example, TextField's property *type* will be passed to input as a string meaning the attribute.  

### Events

All components that are not just displaying data on the screen, must do its logic and return the result of it to the parent. It can be done via dispatching.

Here is the example of the radio-group ui-component:
```svelte
<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  const changeRadio = item => {
    selectedId = item.id;
    dispatch('change', item);
  };
</script>
<input
  on:change="{() => changeRadio(item)}"
  type="radio"
>
``` 
**Attention**: Don't forget that *dispatch* accepts two argument: the first stands for the name of event, the second one it a variable that will be passed as `event.detail`. For example, parent of the radio-group:
 
```svelte
<RadioGroup
  value={$selectedOrder}
  items={orders}
  on:change="{(e) => selectOrder(e.detail)}"
/>
```

### Slots

Use slots wherever it is possible. In the same dropdown you would expect two slots: default (that is a dropdown body) and a handler where you can pass button or some data.

So, slots are not more than a common sense. With proper usage, it will make the UI-system pretty usable.
