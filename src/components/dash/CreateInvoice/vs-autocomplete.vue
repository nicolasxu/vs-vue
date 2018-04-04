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

/* 
  Behaviors:
  0. onFocus, 
          trigger new search based on InputStr
          search for match description from option, set selected and index if match
  - 1. focusout, emit selected, hide dropdown, done
  - 2. click, update selected, emit selected, hide dropdown, done
  - 3. enter, update selected, emit selected, hide dropdown, done
  4. onInput, update searchStr(automatic), 
              update currentItemIndex to -1, 
              emit search change (will trigger new back-end search, result will be passed in via props )
              search all description field of new result, if exactly match, set currentItemIndex and selectedItem 
              select the item if every letter in searchStr matches description

  - 5. arrow up, update currentItemIndex, update selected...
  - 6. arrow down, update currentItemIndex, update selected...

*/

  export default {
    name: 'VsAutocomplete',
    components: {},
    props: ['options', 'initialText'],
    data() {
      return {
        inputStr: this.initialText, // copy props value to internal model
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

    },
    methods: {
      itemClick(index, e) {

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
        this.showDropdown = false


        this.$emit('close', {description: this.inputStr})

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
          trigger new search based on InputStr
          search for match description from option, set selected and index if match
        */
        this.$emit('searchChange', this.inputStr)
        this.selectedItem = {description: this.inputStr}
        this.currentItemIndex = -1
        this.showDropdown = true


      },
      onFocusout() {
        // 1. focusout, emit selected, hide dropdown, done

        this.$emit('close', this.selectedItem)
        this.showDropdown = false
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