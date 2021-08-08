// Realiza la importacion de la libreria, dado que no tiene punto o barra
import Vue from 'vue'

// Realiza la importacion del compontente App.vue
import App from './App.vue'

// Realiza la importacion de tailwind
import '@/assets/css/tailwind.css'

// Importacion de la libreria chartick
import Chartkick from 'vue-chartkick'

// Importacion de la libreria chart
import Chart from 'chart.js'

// Importacion de la libreria vue-spinners
import { VueSpinners } from '@saeris/vue-spinners'

// Realizamos la importacion de las rutas del vue-router
import router from '@/router'

// Realizamos la importacion para filtrar el dato del dolar
import { dollarFilter } from '@/filters'

// Realizamos la importacion para filtrar el porcentaje
import { percentFilter } from '@/filters'

// Con la funcion use() le decimos a Vue que uitlice la libreria
Vue.use(VueSpinners)
Vue.use(Chartkick.use(Chart))

// Usamos el filter() para pasarle el filtro y el nombre a usar en la app
Vue.filter('dollar', dollarFilter)
Vue.filter('percent', percentFilter)

// Configuracion para obtener los tips de produccion
Vue.config.productionTip = false

// Declaracion de la instacia de Vue a traves de la funcion render
new Vue({
  router: router,
  render: (h) => h(App),
}).$mount('#app')
