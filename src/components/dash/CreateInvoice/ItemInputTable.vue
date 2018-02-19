<template>
  <div class="vs-item-table" @click="clickHandler">
    <div class="vs-row vs-header">
      <div v-for="header in headers" class="vs-data">{{header}}</div>
    </div>
    
    <table-row v-for="row in rows" :row="row"></table-row>
   
  </div>
</template>

<script>


  // Requirements:
  /* 
 
  2. autocomplete for description input by shortId and product description
  3. autocomplete is only for product description
  3. after input, all column is editable except sub total, unit price and quantity is required. 
  3. add line
  4. remove line
  5. column names: #, description, unit price, quantity, sub-total



  */

  import TableRow from './ItemInputTableRow.vue'
  export default {
    name: 'ItemInputTable',
    components: {TableRow},
    props: ['headers', 'rows'],
    data() {
      return {

      }
    },
    created() {
      let a = 10
    },
    mounted() {
      console.log('headers:')
      console.log(this.headers)
      console.log(this.rows)
    },
    methods: {
      clickHandler(e) {
  
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


<style lang="sass" >
  
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

