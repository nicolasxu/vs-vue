<template>
  <div 
  @keydown.enter="keyDownEnter"
  @keydown.up="keyDownUp"
  @keydown.down="keyDownDown"
  class="vs-autocomplete">
    <input type="text"
    v-model="inputStr"
    @input="onInput"
    @focus="onFocus"
    ref="inputElem"
    />

    <div class="result-container" v-show="showDropdown">
      <ul class="result-list">
      
        <li class="result-list-item" 
        v-for="(item, index) in options"
        :key="index"
        :class="{selectedItem: currentItemIndex === index }"
        @click.stop="itemClick(index, $event)"
        >
          {{item.description}} - {{item.unitPrice}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'VsAutocomplete',
    components: {},
    props: ['options', 'initialSearchText'],
    data() {
      return {
        inputStr: this.initialSearchText, // copy props value to internal model
        currentItemIndex: -1,
        selectedItem: {},
        showDropdown: true,
        markedOptions: []
      }
    },
    computed: {
 
    },
    created() {

    },
    mounted() {
      // debug

    },
    watch: {
      options: (newOpts, oldOpts) => {
        // 1. do a search of inputStr in newOpts
        // 2. set currentItemIndex, and selectedItem

      }
    },
    methods: {
      itemClick(index, e) {
        this.currentItemIndex = index
        this.selectedItem = this.options[index]
        this.showDropdown = false
        this.inputStr = this.selectedItem.description
        this.$emit('close', this.selectedItem)

      },
      keyDownEnter(e) {
    
        if (this.currentItemIndex !== -1) {
          this.$emit('close', this.selectedItem)
          return
        }
        
        this.$emit('close', {description: this.inputStr})

        this.showDropdown = false

      },
      keyDownUp(e) {
        if (this.options.length === 0) {
          return
        }
        if (this.currentItemIndex === -1) {
          this.currentItemIndex = this.options.length - 1
        } else {
          this.currentItemIndex = ( this.currentItemIndex - 1) >= 0? this.currentItemIndex - 1: this.options.length - 1
        }
        this.selectedItem = this.options[this.currentItemIndex]
        this.inputStr = this.selectedItem.description

        console.log('this.currentItemIndex', this.currentItemIndex)     

      },
      keyDownDown(e) {
        
        if (this.options.length === 0) {
          return
        }
        if (this.currentItemIndex === -1) {
            this.currentItemIndex = 0
        } else {
            this.currentItemIndex = ( Math.abs(this.currentItemIndex + 1) ) % this.options.length
        }
        this.selectedItem = this.options[this.currentItemIndex]
        this.inputStr = this.selectedItem.description



        console.log('this.currentItemIndex', this.currentItemIndex)     
      },
      onInput(e) {
        /*
          4. onInput, update searchStr(automatic), 
              update currentItemIndex to -1, 
              emit search change (will trigger new back-end search, result will be passed in via props )
              search all description field of new result, if exactly match, set currentItemIndex and selectedItem 
              select the item if every letter in searchStr matches description     
        */

        
        this.currentItemIndex = -1
        this.$emit('searchTextChange', this.inputStr)
        

      }, 
      onFocus() {
        /*
        0. onFocus, 
          - trigger new search based on InputStr
          - todo: search for match description from option, set selected and index if match
        */
        console.log('autocomplete onFocus triggered...')
        this.$emit('searchTextChange', this.inputStr)
        this.selectedItem = {description: this.inputStr}
        this.currentItemIndex = -1
        this.showDropdown = true

      }
    }

  }
</script>

<style lang="scss" scoped>
  .vs-autocomplete {
    width: 100%;
    position: relative;
    overflow: visible;
    font-family: monospace;
    .result-container {
      position: relative;
      width: 100%;
      .result-list {
        border: 0;
        position: absolute;
        background-color: white;
        width: 100%;
        padding-left: 0;
        .result-list-item {
          list-style: none;
          cursor:pointer;
          &:active, &:hover, &:focus {
            background-color:  #ddd;
          }
          &.selectedItem {
            background-color: #ccc;
          }
        }
    }

    }


  }
</style>