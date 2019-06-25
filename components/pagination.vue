<!-- Adapted from https://github.com/lokyoung/vuejs-paginate -->
<template>
  <ul :class="containerClass">
    <li v-for="page in pages" :class="[pageClass, page.selected ? activeClass : '', page.disabled ? disabledClass : '']" :key="page.index">
      <template v-if="page.breakView">
        <input 
          v-if="editing === page.index"
          :class="pageLinkClass"
          @keyup.enter.prevent="handlePageSelected(parseInt($event.target.value, 10));"
          :max="pageCount"
          min="1"
          type="number"
        />
        <a
          v-else
          :class="pageLinkClass"
          @click="editing = page.index;"
          tabindex="0"
        >...</a>
      </template>
      <a v-else-if="page.disabled" :class="pageLinkClass" tabindex="0">{{ page.content }}</a>
      <a
        v-else
        @click="handlePageSelected(page.index + 1)"
        :class="pageLinkClass"
        tabindex="0"
      >{{ page.content }}</a>
    </li>
  </ul>
</template>

<script>
  export default {
    props: {
      value: {
        type: Number,
      },
      pageCount: {
        type: Number,
        required: true,
      },
      clickHandler: {
        type: Function,
        default: () => { },
      },
      pageRange: {
        type: Number,
        default: 3,
      },
      marginPages: {
        type: Number,
        default: 1,
      },
      activeClass: {
        type: String,
        default: 'active',
      },
      disabledClass: {
        type: String,
        default: 'disabled',
      },
    },
    data() {
      return {
        innerValue: 1,
        containerClass: 'pages',
        pageClass: 'page-item',
        pageLinkClass: 'page-link-item',
        editing: -1,
      };
    },
    computed: {
      selected: {
        get() {
          return this.value || this.innerValue;
        },
        set(newValue) {
          this.innerValue = newValue;
        },
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
          let breakView = {
            disabled: true,
            breakView: true,
            content: '...',
            index: index,
          };
          items[index] = breakView;
        };

        if (this.pageCount <= this.pageRange) {
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
      firstPageSelected() {
        return this.selected === 1;
      },
      lastPageSelected() {
        return (this.selected === this.pageCount) || (this.pageCount === 0);
      },
    },
    
    methods: {
      handlePageSelected(selected) {
        if (this.selected === selected || isNaN(selected)) return;

        this.innerValue = selected;
        this.$emit('input', selected);
        this.clickHandler(selected);
        this.editing = -1;
      },
    },
  };
</script>

<style lang="css" scoped>
.pages {
  --box-size: 45px;
  display: inline-block;
  text-align: center;
  margin: 10px 0;
  padding: 0;
}
.page-item {
  display: inline-block;
}
.page-item.active > .page-link-item, input.page-link-item {
  background-color: rgba(56, 120, 0, 0.1);;
  border: 1px solid #387800;
  color: #387800;
}
.page-link-item {
  display: inline-block;
  cursor: pointer;
  width: var(--box-size);
  height: var(--box-size);
  margin: 0 10px;
  line-height: var(--box-size);
  font-weight: 500;
  font-size: 25px;
  text-align: center;
  border-radius: 50%;
}
input.page-link-item {
  border-radius: 5% 5% 0% 0%;
  border-width: 0px 0px 2px 0px;
}
.page-link-item:hover {
  background-color: rgba(56, 120, 0, 0.1);
} 
@media screen and (max-width: 768px) {
  .pages {
    --box-size: 32px;
  }
  .page-link-item {
    font-size: 19px;
  }
}
@media screen and (max-width: 380px) {
  .pages {
    --box-size: 26px;
  }
  .page-link-item {
    font-size: 16px;
    margin: 0 5px;
  }
}
</style>
