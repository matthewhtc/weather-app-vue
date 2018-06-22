import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  el: '#app', 
  data() {
    return {
      message: 'testing 125'
    }
  },
  render: h => (
    <App>
    </App>
  ),
}); 
