<template>
  <div class="vs-item-table" >
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
    :key="index"
    ></TableRow>
   
  </div>
</template>

<script>

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
      
    },
    mounted() {
 
    },
    methods: {
 
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

