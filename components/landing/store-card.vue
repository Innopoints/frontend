<template>
  <Card :img="img" :color="color">
    <div class="title">
      {{ title }}
    </div>
    <span class="subtitle">
      {{ subtitle }}
    </span>
    <Button
      :href="buttonURL"
      link
      label="view"
      outline
    />
  </Card>
</template>

<script>
  import Card from '../ui/card';
  import Button from '../ui/button';

  export default {
    components: { Button, Card },
    props: {
      img: String,
      title: String,
      subtitle: String,
      color: String,
      buttonURL: {
        type: String,
        default: '#'
      },
    },
    computed: {
      background() {
        return {
          '#A52222': '#FFF0F0',
          '#217E93': '#F5FDFF',
          '#7A7A7A': '#F6F6F6',
        }[this.color];
      }
    }
  };
</script>
