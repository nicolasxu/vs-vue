<template>
	<div class="vs-row">
		




		<!-- render # cell -->
		<div class="vs-data row-number">
			<div class="cell-wrapper">
				<div class="number-text">{{rowIndex + 1}}</div>
				<div class="remove-btn-wrapper">
					<button class="uk-button uk-button-small remove-row"
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
		},
		removeRow(rowIndex) {
			let confirmed = confirm("Do you want to remove row " + (this.rowIndex + 1) + " ?")
			if (confirmed) {
				this.$emit('rowRemove', rowIndex)
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
				.number-text {
					display: inline;
				}
				.remove-btn-wrapper {
					display: none;
					position: absolute;
					top: -2px;
					left: 50%;
					transform: translate(-50%, 0);

					.remove-row {
						width: 30px;
						height: 25px;
						padding: 0 4px;
						border-radius: 5px;
						color: grey;
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
