<template>
	<div class="chip-toast-wrapper" :class="{'hidden': isHidden}">
		<div class="body">
			<div v-if="show" class="icon"><font-awesome-icon :icon="iconClass"/></div>
			<div class="text">{{ textContent }}</div>
			<div v-if="show" class="close"><font-awesome-icon icon="times"/></div>
		</div>
    </div>
</template>

<script>
export default {
	props: {
		isHidden: {
			type: Boolean,
			default: true,
		},
		textContent: {
			type: String,
		},
		iconClass: {
			type: String,
		},
		show: {
			type: Boolean,
			default: true,
		}
	}
}
</script>

<style scoped>
@import '../css/component/chiptoast.css'
</style>