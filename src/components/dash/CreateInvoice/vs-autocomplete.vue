<template>
  <div 
  @keydown.enter="keyDownEnter"
  @keydown.up="keyDownUp"
  @keydown.down="keyDownDown"
  class="vs-autocomplete">
    <input type="text"
    v-model="inputStr"
    @focus="onFocus"
    @input="onInput"
    @focusout="onFocusout"
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
          {{item.description}}
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
    props: ['options', 'item'],
    data() {
      return {
        inputStr: this.item, // copy props value to internal model
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
      options: (newVal, oldVal) => {
        let newOptions = newVal
        
        for(let i = 0 ; i < newOptions.length; i++) {
          if (newOptions[i].description === this.inputStr) {
            this.currentItemIndex = i
            this.selectedItem = newOptions[i]
            return
          }
        }

      }
    },
    methods: {
      itemClick(index, e) {
        this.$emit('itemSelected')
        this.selectedItem = this.options[index]
        this.showDropdown = false
        this.$emit('close', this.selectedItem)

      },
      keyDownEnter(e) {
        // 3. enter,(selectedItem and currentItemIndex is updated at other place), hide dropdown, done

        window.thisCompo = this.$refs.inputElem.blur()
        // focusout event will handle it


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
        this.$emit('searchChange', this.inputStr)
        this.selectedItem = {description: this.inputStr}

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

        // note, watch 'options' will handle the matching after options are updated
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