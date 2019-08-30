<!-- Adapted from https://github.com/lokyoung/vuejs-paginate -->
<template>
  <nav class="pagination">
    <template v-for="page in pages">
      <TextField
        v-if="editing === page.index"
        @change="changePage"
        :max="pageCount"
        :min="1"
        :key="page.index"
        type="number"
      />
      <Button
        v-else-if="page.breakView"
        :key="page.index"
        @click="editing = page.index"
        class="page"
      >
        ...
      </Button>
      <Button
        v-else
        :key="page.index"
        :class="['page', page.selected ? activeClass : '']"
        @click="changePage(page.index + 1)"
      >
        {{ page.content }}
      </Button>
    </template>
  </nav>
</template>

<script>
  import TextField from '@/components/ui/text-field';
  import Button from '@/components/ui/button';

  export default {
    components: {
      TextField,
      Button,
    },
    props: {
      value: {
        type: Number,
      },
      pageCount: {
        type: Number,
        required: true,
      },
    },
    data() {
      return {
        pageRange: 3,
        innerValue: 1,
        marginPages: 1,
        activeClass: 'current',
        editing: -1,
      };
    },
    computed: {
      selected() {
        return this.value || this.innerValue;
      },
      pages() {
        let items = {};
        let setPageItem = index => {
          items[index] = {
            index: index,
            content: index + 1,
            selected: index === (this.selected - 1),
          };
        };

        let setBreakView = index => {
          items[index] = {
            breakView: true,
            index: index,
          };
        };

        if (this.pageCount <= this.pageRange || this.pageCount <= 6) {
          for (let index = 0; index < this.pageCount; index++) {
            setPageItem(index);
          }
        } else {
          const halfPageRange = Math.floor(this.pageRange / 2);

          for (let i = 0; i < this.marginPages; i++) {
            setPageItem(i);
          }

          let selectedRangeLow = 0;
          if (this.selected > halfPageRange) {
            selectedRangeLow = this.selected - 1 - halfPageRange;
          }

          let selectedRangeHigh = selectedRangeLow + this.pageRange - 1;
          if (selectedRangeHigh >= this.pageCount) {
            selectedRangeHigh = this.pageCount - 1;
            selectedRangeLow = selectedRangeHigh - this.pageRange + 1;
          }

          for (let i = selectedRangeLow; i <= selectedRangeHigh && i <= this.pageCount - 1; i++) {
            setPageItem(i);
          }

          // Check if there is breakView in the left of selected range
          if (selectedRangeLow > this.marginPages) {
            setBreakView(selectedRangeLow - 1);
          }

          // Check if there is breakView in the right of selected range
          if (selectedRangeHigh + 1 < this.pageCount - this.marginPages) {
            setBreakView(selectedRangeHigh + 1);
          }

          // 3rd - loop thru high end of margin pages
          for (let i = this.pageCount - 1; i >= this.pageCount - this.marginPages; i--) {
            setPageItem(i);
          }
        }
        return items;
      },
    },
    methods: {
      changePage(selected) {
        this.editing = -1;
        if(selected >= 1 && selected <= this.pageCount) {
          if (this.selected === selected || isNaN(selected)) return;
          this.innerValue = selected;
          this.$emit('input', selected);
        }
      },
    },
  };
</script>
