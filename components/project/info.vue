<template>
  <div class="info padded">
    <Labeled icon="/images/icons/calendar.svg" label="When">
      {{ eventDate }}
    </Labeled>
    <Labeled label="Organizer" icon="/images/icons/user.svg">
      {{ organizer }}
    </Labeled>
    <Labeled icon="/images/icons/flag.svg" label="Review Status">
      {{ status }}
    </Labeled>
    <Labeled icon="/images/icons/message-square.svg" label="Administrator's Comment" class="comment">
      Back in my day, the sun was brighter, the grass was greener, the events weren’t so hopelessly boring. Add some food to the party.
    </Labeled>
  </div>
</template>

<script>
  import Labeled from '@/components/ui/labeled';
  import printDate from '@/utils/eventDate';

  export default {
    name: 'ProjInfo',
    components: {
      Labeled,
    },
    props: {
      organizer: String,
      status: String,
      date: Object,
    },
    computed: {
      eventDate() {
        return printDate(this.date);
      },
    },
  };
</script>
