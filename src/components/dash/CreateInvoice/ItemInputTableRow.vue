<template>
	<div class="vs-row">
		
		<div v-for="(data, index) in row" :key="index" @click="showCellEdit(index)" 
		class="vs-data" :class="{pointer: (index!==row.length-1 && index !== 0) , 'no-event': (index=== 0 || index === row.length -1) }" >
			
			<!-- 
				based on the convention that column number and order are fixed
				then you can use 'index' to determine which column it is.
			 -->
			 <!-- # column -->
			<div v-if="index === 0">
				{{data}}
			</div>

			<!-- description column -->
			<div v-if="index === 1" >
				<div v-show="!showEdit[index]">{{data}}</div>
				<div v-show="showEdit[index]">
					<input type="text" v-model="rows[rowIndex][index]" 
					@focusout="hideCellEdit(index)"
					:ref="'tb-input-' + index"
					/>
				</div>
			</div>

			<!-- Unit Price, Quantity column -->
			<div v-if="index === 2 || index === 3"> 
				<div v-show="!showEdit[index]">{{data}}</div>
				<div v-show="showEdit[index]">
					<input type="text"  v-model.number="rows[rowIndex][index]" 
					@focusout="hideCellEdit(index)" 
					:ref="'tb-input-' + index"/>
				</div>
			</div>

			<!-- Sub Total column -->
			<div v-if="index === 4">
				${{data}}
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
			console.log(index)
			Vue.set(this.showEdit, index, true)
			console.log(this)
			this.$nextTick(() => {
				
				this.$refs['tb-input-' + index][0].focus()
				console.log('next tick works...')
				
			})

		},
		hideCellEdit(index) {
			// console.log(index)
			this.showEdit[index] = false
			console.log('hide cell edit')

		}

	}
}

</script>

<style lang="sass" scoped>

	.no-event {
		pointer-events: none;
	}

</style>
