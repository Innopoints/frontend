<template>
  <Card class="activity-brief">
    <header class="title">{{ name }}</header>
    <div class="row">
      <Labeled icon="/images/icons/gift.svg" label="Reward">
        {{ isFixed ? reward : reward * worktime }}
        <Innopoint class="innopoint" />
      </Labeled>
      <Labeled v-if="!isFixed" icon="/images/icons/clock.svg" label="Worktime">
        {{ worktime }} hours
      </Labeled>
    </div>
    <Labeled icon="/images/icons/align-left.svg" label="Description">
      {{ description }}
    </Labeled>
  </Card>
</template>

<script>
  import Card from '@/components/ui/card';
  import Labeled from '@/components/ui/labeled';
  import Innopoint from '@/static/images/innopoint-sharp.svg';

  export default {
    name: 'BriefActivity',
    components: {
      Labeled,
      Card,
      Innopoint,
    },
    props: {
      full: Boolean,
      name: String,
      description: String,
      reward: Number,
      worktime: Number,
      isFixed: Boolean,
    },
  };
</script>
