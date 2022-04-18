import Vue from 'vue'
import Vuex from "vuex"
import home from './home.js'
Vue.use(Vuex)
const store = new Vuex.Store({
	modules:{
		'm_home': home
	}
})
 export default store