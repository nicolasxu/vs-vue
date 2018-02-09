<template>
	<div class="vs-row">
		this is vs table row
		<div v-for="(data, index) in row" :key="index" @click="editCell(index)" class="vs-data">
			{{data}}
		</div>
	</div>
</template>

<script>
export default {
	name: 'ItemInputTableRow',
	props: ['row'],
	data() {
		return {

		}
	},
	created() {

	},
	mounted() {

	},
	methods: {
		editCell(index) {
			console.log(index)
		}
	}
}

</script>

<style lang="sass" scoped>


</style>
