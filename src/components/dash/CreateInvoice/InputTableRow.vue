<template>
	<div class="vs-row">

		<!-- render # cell -->
		<div class="vs-data row-number">
			<div class="cell-wrapper">
				<div class="number-text">{{rowIndex + 1}}</div>
				<div class="remove-btn-wrapper">
					<button class="uk-button uk-button-small uk-button-primary remove-row-btn"
					@click="removeRow(rowIndex)">
						
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm101.8-262.2L295.6 256l62.2 62.2c4.7 4.7 4.7 12.3 0 17l-22.6 22.6c-4.7 4.7-12.3 4.7-17 0L256 295.6l-62.2 62.2c-4.7 4.7-12.3 4.7-17 0l-22.6-22.6c-4.7-4.7-4.7-12.3 0-17l62.2-62.2-62.2-62.2c-4.7-4.7-4.7-12.3 0-17l22.6-22.6c4.7-4.7 12.3-4.7 17 0l62.2 62.2 62.2-62.2c4.7-4.7 12.3-4.7 17 0l22.6 22.6c4.7 4.7 4.7 12.3 0 17z"/></svg>						
					
					</button>			
				</div>
			</div>
		</div>
		
		<div 
		v-for="(value, key, index) in row" 
		:key="index" 
		@click="showCellEdit(key)" 
		:class="{pointer: key !== 'subTotal', 'no-event': key === 'subTotal' }" 
		class="vs-data" >
			
			<!-- render description cell -->
			<div v-if="key === 'description'" >
				<div v-show="!showEdit[key]">{{value}}</div>
				<div v-show="showEdit[key]">

					<ProductDescription
					@doneEditing="descriptionDoneEditing"
					:initialDescText="row[key]"
					>
					</ProductDescription>
					

				</div>
			</div>

			<!-- render Unit Price, Quantity cell -->
			<div v-if="key === 'unitPrice' || key === 'quantity' "> 
				<div v-show="!showEdit[key]">{{value}}</div>
				<div v-show="showEdit[key]">
					<input type="text"
					v-model.number="rowCopy[key]"
					@focusout="focusOutEdit(key)" 
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
			foundProducts: [],
			rowCopy: {}
		}
	},
	created() {

	},
	mounted() {

	},
	methods: {
		showCellEdit(cellKey) {
			
			if (this.showEdit[cellKey] === true) {
				return
			}
			this.rowCopy = JSON.parse(JSON.stringify(this.row))
			this.$set(this.showEdit, cellKey, true)

			if (cellKey === 'description') {

 				let $input = $('.multiselect__input')
        $input.focus()

			} else {

				this.$nextTick(() => {
					this.$refs['tb-input-' + cellKey][0].focus()
				})

			}
		},
		focusOutEdit(cellKey) {
			

			this.showEdit[cellKey] = false
			if (this.rowCopy[cellKey] !== this.row[cellKey]) {
				let row = {}
				row[cellKey] = this.rowCopy[cellKey]
				invoiceStore.setItemsRow(this.rowIndex, row)

			}
		}, 
		descriptionDoneEditing(payload) {

			this.showEdit.description = false

			let row = payload
			invoiceStore.setItemsRow(this.rowIndex, row)

		},
		removeRow(rowIndex) {
			let confirmed = confirm("Do you want to remove row " + (this.rowIndex + 1) + " ?")
			if (confirmed) {
				
				invoiceStore.removeItemsRow(rowIndex)

			}
		}
	}
}

</script>

<style lang="sass" scoped>
	.vs-row {
		
		.row-number {
			text-align: center;
			.cell-wrapper {
				position: relative;
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items:center;
				.number-text {
					display: inline;

				}
				.remove-btn-wrapper {
					display: none;
					position: absolute;
					// top: -2px;
					left: 50%;
					transform: translate(-50%, 0);

					.remove-row-btn {
						background-color: #00a8e6;
						// color: #00a8e6;
						color: white;
						width: 30px;
						height: 28px;
						padding: 0 4px;
						border-radius: 5px;
						
						fill: currentColor;

					}
				}				
			}
			&:hover {
				.remove-btn-wrapper {
					display: inline-block;
				}
			}

		}
	}
	.no-event {
		pointer-events: none;
	}


</style>
