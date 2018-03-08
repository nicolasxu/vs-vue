<template>
	<div class="vs-row">

		<div class="vs-data row-count">{{rowIndex + 1}}</div>
		
		<div 
		v-for="(value, key, index) in row" 
		:key="index" 
		@click="showCellEdit(key)" 
		:class="{pointer: key !== 'subTotal', 'no-event': key === 'subTotal' }" 
		class="vs-data" >
			
			<!-- 
				based on the convention that column number and order are fixed
				then you can use 'cellIndex' to determine which column it is.
			 -->
			 <!-- render # cell -->
		

			<!-- render description cell -->
			<div v-if="key === 'description'" >
				<div v-show="!showEdit[key]">{{value}}</div>
				<div v-show="showEdit[key]">

					<product-description
					@doneEditing="myDoneEditing(key)"
					:row="row"
					:rowKey="key"
					></product-description>
					

				</div>
			</div>

			<!-- render Unit Price, Quantity cell -->
			<div v-if="key === 'unitPrice' || key === 'quantity' "> 
				<div v-show="!showEdit[key]">{{value}}</div>
				<div v-show="showEdit[key]">
					<input type="text"
					v-model.number="row[key]" 
					@focusout="hideCellEdit(key)" 
					:ref="'tb-input-' + key"/>
				</div>
			</div>

			<!-- render Sub Total cell -->
			<div v-if="key === 'subTotal' ">
				${{value}}
			</div>


		</div>
	</div>
</template>

<script>
import Multiselect from 'vue-multiselect' 
import invoiceStore from './createInvoiceStore.js'
import ProductDescription from './ProductDescription.vue'

export default {
	name: 'ItemInputTableRow',
	components: {ProductDescription },
	props: ['row', 'rowIndex'],
	data() {
		return {
			showEdit: {},
			foundProducts: []
		
		}
	},
	created() {

	},
	mounted() {

	},
	methods: {
		showCellEdit(theKey) {
			
			if (this.showEdit[theKey] === true) {
				return
			}
			this.$set(this.showEdit, theKey, true)

			if (theKey === 'description') {

 				let $input = $('.multiselect__input')
        $input.focus()

			} else {

				this.$nextTick(() => {
					this.$refs['tb-input-' + theKey][0].focus()
				})

			}


		},
		hideCellEdit(theKey) {
			console.log('focusout')
			this.showEdit[theKey] = false
		}, 
		myDoneEditing(cellKey) {
			console.log('done editing...')
			this.showEdit[cellKey] = false
		}

	}
}

</script>

<style lang="sass" scoped>

	.no-event {
		pointer-events: none;
	}


</style>
