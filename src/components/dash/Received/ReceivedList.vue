<template>
  <div class="received-list">
    <table class="uk-table uk-table-hover uk-table-striped received-list-table">
      <thead>
        <tr>
          <th>Inv#</th>
          <th>From</th>
          <th>Invoice Date</th>
          <th>Due On</th>
          <th>Status</th>
          <th>Amount</th>
          <th>Payment</th>
        </tr>
      </thead>
      <tbody>
        <ReceivedListItem 
        v-for="(invoice, index) in receivedInvoices"
        :invoice="invoice"
        :key="index"
        :invoiceIndex="index"
        ></ReceivedListItem>
      </tbody>
    </table>    
  </div>

</template>

<script>
  import ReceivedListItem from './ReceivedListItem.vue'

  export default {
    name: 'ReceivedList',
    components: {ReceivedListItem},
    props: ['receivedInvoices'],
    data() {
      return {

      }
    },
    methods: {

    }

  }
</script>

<style lang="sass" scoped>
  @import '../../../scss/reusable.scss';
  .received-list {

  }

</style>