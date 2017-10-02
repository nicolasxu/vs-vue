<template>
  <div class="client-list">
    <table class="uk-table uk-table-hover uk-table-striped client-list-table">
       
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Phone</th>
            <th>You Created</th>
            <th>Outstanding</th>
          </tr>
        </thead>
     
        <tbody>
          <tr>
            <td>Table Data</td>
            <td>Table Data</td>
            <td>Table Data</td>
            <td>Table Data</td>
            <td>Table Data</td>
          </tr>
          <tr>
            <td>Table Data</td>
            <td>Table Data</td>
            <td>Table Data</td>
            <td>Table Data</td>
            <td>Table Data</td>
          </tr>
          <tr>
            <td>Table Data</td>
            <td>Table Data</td>
            <td>Table Data</td>
            <td>Table Data</td>
            <td>Table Data</td>
          </tr>
          <tr>
            <td>Table Data</td>
            <td>Table Data</td>
            <td>Table Data</td>
            <td>Table Data</td>
            <td>Table Data</td>
          </tr>                  
        </tbody>
    </table>
  </div>  
</template>

<script>
  export default {
    name: 'clientList',
    data() {
      return {}
    }
  }
</script>

<style lang="sass" scoped>
  @import '../../../scss/reusable.scss';
  .client-list {
    .client-list-table th, .client-list-table td {
      padding: 8px 8px;
      border-bottom: 1px solid #E5E5E5;
    }
  }
</style>
