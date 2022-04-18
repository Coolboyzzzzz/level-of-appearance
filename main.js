// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import store from './store/store.js'

Vue.config.productionTip = false

App.mpType  = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()
// #endif
uni.$showMessage = function (title,icon){
	uni.showToast({
		title,
		icon,
		duration: 1500
		
	})
}

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif