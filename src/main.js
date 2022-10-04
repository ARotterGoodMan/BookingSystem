import App from './App.vue'
import {createApp} from 'vue'
import {router} from './router'
import BootstrapVue3 from 'bootstrap-vue-3'
import 'bootstrap/dist/js/bootstrap.js'
import 'animate.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import 'font-awesome/css/font-awesome.min.css'


const app = createApp(App)
app.use(BootstrapVue3)
app.use(router)
app.mount('#app')
app.config.globalProperties.mydata = {}