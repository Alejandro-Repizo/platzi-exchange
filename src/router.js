/**
 * Realizamos la importacion de vue
 * para agregarle el vue-router
 */
import Vue from 'vue'
import Router from 'vue-router'

/**
 *  Realizamos la importacion del componente
 *  que se va a mostrar en el path /
 */
import Home from '@/views/Home'
import About from '@/views/About'
import Error from '@/views/Error'
import CoinDetail from '@/views/CoinDetail'

/**
 * La funcion use() nos permite incorporar
 * los diferentes plugins que tiene VueJs
 */
Vue.use(Router)

/**
 * Realizamos un export con una nueva instacia
 * del vue-router
 */
export default new Router({
  /**
   * Definimos las diferentes rutas que corresponden
   * a los diferentes componentes
   */

  mode: 'history', // Utiliza el history mode de HTML

  routes: [
    // Definimos un array de rutas
    {
      path: '/', // Cada ruta debe tener su path
      name: 'home', // Nombre de la ruta
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
    {
      path: '/coin/:id', // El id va a ser dinamico por eso los dos puntos
      name: 'coin-detail',
      component: CoinDetail,
    },
    {
      path: '*', // Estable este componente como comportamiento determinado
      name: 'error',
      component: Error,
    },
  ],
})
