<template>
  <div class="vs-item-table" @click="clickHandler">
    <div class="vs-row vs-header">
      <div class="vs-data">#</div>
      <div class="vs-data">Description</div>
      <div class="vs-data">Unit Price</div>
      <div class="vs-data">quantity</div>
      <div class="vs-data">Sub Total</div>
    </div>
    
    <div class="vs-row">
      <div class="vs-data">1</div>
      <div class="vs-data pointer" @click="editCell(1, 1)">
        <span>xxxx</span>
        <input type="text" />
        </div>
      <div class="vs-data pointer"  @click="editCell(1, 2)">33</div>
      <div class="vs-data pointer"  @click="editCell(1, 4)">2</div>
      <div class="vs-data">66</div>
    </div>
   
  </div>

</template>

<script>


  // Requirements:
  /* 
  1. add column
  2. autocomplete for description input by shortId and product description
  3. autocomplete is only for product description
  3. after input, all column is editable except sub total, unit price and quantity is required. 
  3. add line
  4. remove line
  5. column names: #, description, unit price, quantity, sub-total



  */


 export default {
    name: 'ItemInputTable',
    data() {
      return {
        headers: [
          {key: 1, name: '#', removable: false}, 
          {key: 2, name: 'description', removable: false}, 
          {key: 3, name: '$/unit', removable: false}, 
          {key: 4, name: 'quantity', removable: false},
          {key: 5, name: 'sub-total', removable: false}
        ],
        data: [], // Array[Array] [[3,4,5], [1,2,4]]
        dataCtrl: []
      }
    },
    created() {
      for(let i=0; i < 5 /* 5 rows */ ;i++) {
        for (let j=0; j < this.headers.length; j++  ) {
          this.dataCtrl[i].push({editing: false})
        }
      }
    },
    mounted() {

      this.offsetX = this.$el.offsetLeft 
      this.offsetY = this.$el.offsetTop
      window.testTable = this.$el
    },
    methods: {
      clickHandler(e) {
        window.clickTest = e

        console.log('x:' + e.x + ', y:' + e.y)
        let x = e.x - this.offsetX
        let y = e.y - this.offsetY
        console.log('relative X:' + x + ' relative Y:' + y )
      },
      addColumn(name) {

      },
      removeColumn(name) {

      },
      addRow() {

      },
      removeRow(index) {

      },
      calculateSubTotal(index) {
      },
      editCell(row, col) {
        console.log('row: ' + row)
        console.log('col: ' + col)
      }

    }
 }
  
</script>


<style lang="sass" scoped>
  
  .vs-item-table {
    .pointer {
      cursor: pointer;
      &:hover {
        background-color: whitesmoke;
      }
    }
    display: table;
    width: 100%;
    position: relative;
    .vs-row {

      display: table-row;
      .vs-data {
        
        display: table-cell;
        font-size: 16px;
       
        border: 1px solid grey;
      }
    }
  }
</style>

