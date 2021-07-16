/**
 * Realiza la importacion de vue (libreria) y
 * ademas la importacion del componente app
 *
 * */
import Vue from 'vue' //es libreria porque no tiene ni punto ni barra
import App from './App.vue'
import '@/assets/css/tailwind.css'
import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'
import { VueSpinners } from '@saeris/vue-spinners'

// el @ hace referencia al directorio src

// Router y filtros
import router from './router'
import { dollarFilter } from '@/filters'
import { percentFilter } from '@/filters'

Vue.filter('dollar', dollarFilter)
Vue.filter('percent', percentFilter)

// Usar las librerias externas
Vue.use(VueSpinners)
Vue.use(Chartkick.use(Chart))

/**
 * Configuracion para tips de produccion
 */
Vue.config.productionTip = false

/**
 * Instancia de Vue,
 * la function mount tiene la misma
 * funcion que el;
 */
new Vue({
  router: router,
  render: (h) => h(App), //El seteo de la aplicacion
}).$mount('#app')
