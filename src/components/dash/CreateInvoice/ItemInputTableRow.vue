<template>
	<div class="vs-row">
		
		<div 
		v-for="(cell, cellIndex) in row" 
		:key="cellIndex" 
		@click="showCellEdit(cellIndex)" 
		:class="{pointer: (cellIndex!==row.length-1 && cellIndex !== 0) , 'no-event': (cellIndex=== 0 || cellIndex === row.length -1) }" 
		class="vs-data" >
			
			<!-- 
				based on the convention that column number and order are fixed
				then you can use 'cellIndex' to determine which column it is.
			 -->
			 <!-- render # cell -->
			<div v-if="cellIndex === 0">
				{{cell}}
			</div>

			<!-- render description cell -->
			<div v-if="cellIndex === 1" >
				<div v-show="!showEdit[cellIndex]">{{cell}}</div>
				<div v-show="showEdit[cellIndex]">
					<input type="text" v-model="rows[rowIndex][cellIndex]" 
					@focusout="hideCellEdit(cellIndex) "
					:ref="'tb-input-' + cellIndex"
					/>
				</div>
			</div>

			<!-- render Unit Price, Quantity cell -->
			<div v-if="cellIndex === 2 || cellIndex === 3"> 
				<div v-show="!showEdit[cellIndex]">{{cell}}</div>
				<div v-show="showEdit[cellIndex]">
					<input type="text"  
					v-model.number="rows[rowIndex][cellIndex]" 
					@focusout="hideCellEdit(cellIndex)" 
					:ref="'tb-input-' + cellIndex"/>
				</div>
			</div>

			<!-- render Sub Total cell -->
			<div v-if="cellIndex === 4">
				${{cell}}
			</div>


		</div>
	</div>
</template>

<script>
import Vue from 'vue'
import invoiceStore from './createInvoiceStore.js'

export default {
	name: 'ItemInputTableRow',
	props: ['row', 'rowIndex'],
	data() {
		return {
			showEdit: {},
			rows: invoiceStore.rows
		}
	},
	created() {

	},
	mounted() {

	},
	methods: {
		showCellEdit(index) {
			if (this.showEdit[index] === true) {
				return
			}
			Vue.set(this.showEdit, index, true)
			this.$nextTick(() => {
				
				this.$refs['tb-input-' + index][0].focus()
				console.log('next tick works...')
				
			})

		},
		hideCellEdit(index) {
			// console.log(index)
			this.showEdit[index] = false
			

		}

	}
}

</script>

<style lang="sass" scoped>

	.no-event {
		pointer-events: none;
	}

</style>
