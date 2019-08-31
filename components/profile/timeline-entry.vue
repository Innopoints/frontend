<template>
  <div class="entry">
    <div class="icon">
      <FileIcon v-if="type === 'V'" />
      <ShoppingBagIcon v-if="type === 'P'" />
      <ChevronsUpIcon v-if="type === 'M'" />
      <PackageIcon v-if="type === 'C'" />
    </div>
    <div class="content">
      <template v-if="type === 'V'">
        <div class="lb">Applied for</div>
        <div class="lb">{{ action.application.name }} on</div>
        <nuxt-link :to="'/project/' + action.application.project.link" class="lb">
          {{ action.application.project.name }}
        </nuxt-link>
        <div :class="['status', {bad: action.application.status === 'R', good: action.application.status === 'A'}]">
          application&nbsp;
          {{
            {
              A: 'approved',
              P: 'awaiting approval',
              R: 'rejected'
            }[action.application.status]
          }}
        </div>
        <time>{{ action.date }}</time>
      </template>

      <template v-if="type === 'P'">
        <div class="lb">Purchased the</div>
        <nuxt-link :to="'/store/' + action.item.id" class="lb">
          "{{ action.item.name }}" {{ action.item.type }}
        </nuxt-link>
        <div :class="['status', {bad: action.status === 'R', good: action.status === 'A'}]">
          {{
            {
              W: 'item is on its way to 319',
              R: 'purchase rejected',
              A: 'item ready for pickup at 319'
            }[action.status]
          }}
        </div>
        <time>{{ action.date }}</time>
      </template>

      <template v-if="type === 'M'">
        <div class="lb">Granted moderator rights on</div>
        <nuxt-link :to="'/project/' + action.project.link" class="lb">
          {{ action.project.name }}
        </nuxt-link>
        <time>{{ action.date }}</time>
      </template>

      <template v-if="type === 'C'">
        <div class="lb">Created the project</div>
        <nuxt-link :to="'/project/' + action.project.link" class="lb">
          {{ action.project.name }}
        </nuxt-link>
        <div :class="['status', {bad: action.status === 'R', good: action.status === 'A'}]">
          {{
            {
              W: 'project awaiting final review',
              R: 'activity statistics sent back for corrections',
              A: 'activities reviewed & approved'
            }[action.status]
          }}
        </div>
        <time>{{ action.date }}</time>
      </template>
    </div>
  </div>
</template>

<script>
  import FileIcon from '@/static/images/icons/file.svg';
  import ChevronsUpIcon from '@/static/images/icons/chevrons-up.svg';
  import ShoppingBagIcon from '@/static/images/icons/shopping-bag.svg';
  import PackageIcon from '@/static/images/icons/package.svg';

  export default {
    name: 'TimelineEntry',
    components: {
      FileIcon,
      ChevronsUpIcon,
      ShoppingBagIcon,
      PackageIcon,
    },
    props: {
      // One of [V for volunteering application, P for purchase,
      // M for promotion for moderator, C for project creation]
      type: {
        type: String,
        required: true,
      },
      important: Boolean,
      action: {
        type: Object,
        default: () => ({
          date: '',
          status: '',
          application: {},
          item: {},
        }),
      },
    },
  };
</script>
