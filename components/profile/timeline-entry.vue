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
        <div
          v-if="action.application.project.status === 'C'"
          :class="['status', {bad: action.application.status === 'R', good: action.application.status === 'A'}]"
        >
          application&nbsp;
          {{
            {
              A: 'approved',
              P: 'awaiting approval',
              R: 'rejected'
            }[action.application.status]
          }}
        </div>
        <template v-else-if="action.application.project.status === 'F'">
          <div class="status good">
            1337 <Innopoint /> gained
            {{ !action.application.comment ? ', leave feedback to claim' : '' }}
          </div>
          <Button
            v-if="!action.application.comment"
            filled
            class="mt"
            label="leave feedback"
          />
        </template>
        <time>
          {{ action.date }}
          <Dot v-if="important" />
        </time>
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
        <time>
          {{ action.date }}
          <Dot v-if="important" />
        </time>
      </template>

      <template v-if="type === 'M'">
        <div class="lb">Granted moderator rights on</div>
        <nuxt-link :to="'/project/' + action.project.link" class="lb">
          {{ action.project.name }}
        </nuxt-link>
        <time>
          {{ action.date }}
          <Dot v-if="important" />
        </time>
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
        <Button
          v-if="action.status === 'R'"
          filled
          danger
          class="mt"
          label="make corrections"
        />
        <time>
          {{ action.date }}
          <Dot v-if="important" />
        </time>
      </template>
    </div>
  </div>
</template>

<script>
  import FileIcon from '@/static/images/icons/file.svg';
  import ChevronsUpIcon from '@/static/images/icons/chevrons-up.svg';
  import ShoppingBagIcon from '@/static/images/icons/shopping-bag.svg';
  import PackageIcon from '@/static/images/icons/package.svg';
  import Innopoint from '@/static/images/innopoint-sharp.svg';
  import Button from '@/components/ui/button';
  import Dot from '@/components/ui/dot';

  export default {
    name: 'TimelineEntry',
    components: {
      Dot,
      Button,
      FileIcon,
      ChevronsUpIcon,
      ShoppingBagIcon,
      PackageIcon,
      Innopoint,
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
