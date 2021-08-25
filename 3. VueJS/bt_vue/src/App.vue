<template>
  <div id="app">
    <Header />
    <Menu />
    <BaseContent />
  </div>
</template>

<script>
import Vue from "vue";
import Vuelidate from 'vuelidate';
Vue.use(Vuelidate);

import { library } from '@fortawesome/fontawesome-svg-core'
import {
	faAngleDown,
	faTimesCircle,
	faUserTimes,
	faUserPlus,
	faCheck,
	faSave,
	faTimes,
	faExclamationTriangle,
	faSpinner
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(
	faAngleDown,
	faTimesCircle,
	faUserTimes,
	faUserPlus,
	faCheck,
	faSave,
	faTimes,
	faExclamationTriangle,
	faSpinner
);
Vue.component("font-awesome-icon", FontAwesomeIcon);

import Header from "./layout/TheHeader.vue";
import Menu from "./layout/TheMenu.vue";
import BaseContent from "./layout/TheContent.vue";

export default {
	name: "App",
	components: {
		Header,
		Menu,
		BaseContent,
	},
};
</script>

<style>
@import "css/common/main.css";
</style>
