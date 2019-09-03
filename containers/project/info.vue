<template>
  <div class="top-info padded">
    <h1>{{ title }}</h1>

    <div class="info">
      <Labeled icon="/images/icons/calendar.svg" label="When">
        {{ eventDate }}
      </Labeled>
      <Labeled label="Organizer" icon="/images/icons/user.svg">
        {{ organizer }}
      </Labeled>
      <Labeled v-if="admin" icon="/images/icons/flag.svg" label="Review Status">
        {{ status }}
      </Labeled>
      <Labeled
        v-if="admin"
        icon="/images/icons/message-square.svg"
        label="Administrator's Comment"
        class="comment"
      >
        Back in my day, the sun was brighter, the grass was greener, the events weren’t so hopelessly boring. Add some food to the party.
      </Labeled>
    </div>

    <div v-if="admin" class="actions">
      <Button
        img="/images/icons/edit.svg"
        label="edit"
        outline
      />
      <Button
        img="/images/icons/trash-2.svg"
        label="delete"
        outline
        danger
      />
      <Button
        img="/images/icons/check-circle.svg"
        label="mark as finished"
        filled
      />
      <Button
        img="/images/icons/upload.svg"
        label="send for review"
        filled
      />
    </div>
  </div>
</template>

<script>
  import Labeled from '@/components/ui/labeled';
  import printDate from '@/utils/eventDate';
  import Button from '@/components/ui/button';

  export default {
    name: 'ProjInfo',
    components: {
      Button,
      Labeled,
    },
    inheritAttrs: false,
    props: {
      title: String,
      organizer: String,
      status: String,
      date: Object,
      admin: Boolean,
    },
    computed: {
      eventDate() {
        return printDate(this.date);
      },
    },
  };
</script>
