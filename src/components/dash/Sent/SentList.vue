<template>
  <div class="sent-list">
    sent-list

    <table class="uk-table uk-table-hover uk-table-striped sent-list-table">
      <thead>
        <tr>
          <th>Inv#</th>
          <th>To</th>
          <th>Sent On</th>
          <th>Due On</th>
          <th>Status</th>
          <th>Amount</th>
          <th>Payment</th>
        </tr>
      </thead>
      <tbody>
        <SentListItem 
        v-for="(invoice, index) in sentInvoices"
        :invoice="invoice"
        :key="index"
        :invoiceIndex="index"
        ></SentListItem>
      </tbody>
    </table>



  </div>
</template>

<script>
  import SentListItem from './SentListItem.vue'

  export default {
    name: 'SentList',
    components: {SentListItem},
    props: ['sentInvoices'],
    data() {
      return {

      }
    },
    methods: {

    }
  }
</script>

<style lang="scss" scoped>
  @import '../../../scss/reusable.scss';
  .sent-list {

  }
</style>