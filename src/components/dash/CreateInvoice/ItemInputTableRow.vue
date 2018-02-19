<template>
	<div class="vs-row">
		
		<div v-for="(data, index) in row" :key="index" @click="showCellEdit(index)" 
		class="vs-data" :class="{pointer: index!==row.length-1 }" >
			
			<!-- 
				based on the convention that column number and order are fixed
				then you can use 'index' to determine which column it is.
			 -->
			<div v-if="index === 1" >
				
				{{data}}
				<div v-show="showEdit[index]">
					autocomplete editing... {{showEdit[index]}}
				</div>
			</div>


			<div v-if="index === 2 || index === 3"> 
				{{data}}
				<div v-show="false">
					input tag editing.. . 
				</div>
			</div>


		</div>
	</div>
</template>

<script>
import Vue from 'vue'
export default {
	name: 'ItemInputTableRow',
	props: ['row'],
	data() {
		return {
			showEdit: {}
		}
	},
	created() {

	},
	mounted() {

	},
	methods: {
		showCellEdit(index) {
			console.log(index)
			Vue.set(this.showEdit, index, true)
			// this.showEdit[index] = true
			// this.showEdit = true
		},
		hideCellEdit(index) {
			console.log(index)
			this.showEdit[index] = false
		}

	}
}

</script>

<style lang="sass" scoped>


</style>
