<template>
	<div :class="buttonDivClass">
		<button :class="buttonClass" :id="buttonId" @click="btnOnClick">
			<span class="btn-icon" :class="{'hideIcon': hideIcon}"><font-awesome-icon v-if="!hideIcon" :icon="iconClass"/></span>
			<span class="btn-text">{{ buttonText }}</span>
		</button>
	</div>
</template>

<script>
export default {
	name: "BaseButton",
	props: {
		buttonDivClass: {
			type: String,
		},
		buttonClass: {
			type: [String, Object],
		},
		buttonId: {
			type: String,
		},
		hideIcon: {
			type: Boolean,
			default: false,
		},
		active: {
			type: Boolean,
			default: false,
		},
		iconClass: {
			type: String,
		},
		buttonText: {
			type: String,
		}
	},
	methods: {
		btnOnClick: function() {
			this.$emit('btnOnClick');
		}
	},
}
</script>

<style scoped>
@import '../css/component/button.css';
</style>