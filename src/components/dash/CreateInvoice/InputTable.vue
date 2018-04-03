<template>
  <div class="vs-item-table" @click="clickHandler">
    <col width="5%">
    <col width="60%">
    <col width="10%">
    <col width="10%">
    <col width="10%">
    <div class="vs-row vs-header">
      <div v-for="(header,index) in headers"
      :class="{'text-center': index===0}"
      class="vs-data">{{header}}</div>
    </div>
    
    <TableRow 
    v-for="(row, index) in rows" 
    :row="row"  
    :row-index="index" 
    @rowChange="RowDataChangeEmitter"
    @rowRemove="rowRemoveEmitter"
    ></TableRow>
   
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

  import TableRow from './InputTableRow.vue'
  export default {
    name: 'InputTable',
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
 
    },
    methods: {
      clickHandler(e) {
  
      },
      addRow() {
      },
      removeRow(index) {

      },
      calculateSubTotal(index) {
      },
      editCell(row, col) {
       
      },
      RowDataChangeEmitter(payload) {
        /* payload example
        
        payload = {
          rowIndex: 3,
          rowData: {....}
        }

        */
        
        this.$emit('tableDataChange', payload)
      },
      rowRemoveEmitter(rowIndex) {
        this.$emit('tableRowRemove', rowIndex)
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
    font-size: 16px;
    .text-center {
      text-align: center;
    }
    .vs-header {
    }
    .vs-row {
      display: table-row;

      .vs-data {
        // cell
        display: table-cell;
        vertical-align: middle;
        height: 32px; // function as min-height
        border: 1px solid grey;
        input {
          width: 100%;
          border: 0;
        }
      }
    }
  }
</style>

