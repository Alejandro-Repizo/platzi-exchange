<template>
  <div class="flex-col">
    <div class="flex justify-center">
      <sync-loader
        :loading="isLoading"
        :color="'#68d391'"
        :size="25"
      ></sync-loader>
    </div>

    <!-- Agregamos el template para no utilizar una etiqueta y moleste el diseno -->
    <template v-if="!isLoading">
      <div class="flex flex-col sm:flex-row justify-around items-center">
        <div class="flex flex-col items-center">
          <img
            class="w-20 h-20 mr-5"
            :alt="asset.name"
            :src="`https://static.coincap.io/assets/icons/${asset.symbol.toLowerCase()}@2x.png`"
          />
          <h1 class="text-5xl">
            {{ asset.name }}
            <small class="sm:mr-2 text-gray-500">{{ asset.symbol }}</small>
          </h1>
        </div>

        <div class="my-10 flex flex-col">
          <ul>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Ranking</b>
              <span>#{{ asset.rank }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio actual</b>
              <span>{{ asset.priceUsd | dollar }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio más bajo</b>
              <span>{{ min | dollar }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio más alto</b>
              <span>{{ max | dollar }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio Promedio</b>
              <span>{{ avg | dollar }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Variación 24hs</b>
              <span>{{ asset.changePercent24Hr | percent }}</span>
            </li>
          </ul>
        </div>

        <div class="my-10 sm:mt-0 flex flex-col justify-center text-center">
          <button
            @click="toggleConverter"
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            {{ fromUsd ? `USD a ${asset.symbol}` : `${asset.symbol} a USD` }}
          </button>

          <div class="flex flex-row my-5">
            <label class="w-full" for="convertValue">
              <input
                v-model="convertValue"
                id="convertValue"
                type="number"
                :placeholder="`Valor en ${fromUsd ? 'USD' : asset.symbol}`"
                class="text-center bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
              />
            </label>
          </div>
          <span class="text-xl"
            >{{ convertResult }} {{ fromUsd ? `${asset.symbol}` : `USD` }}</span
          >
        </div>
      </div>

      <!-- Libreria chart -->
      <line-chart
        class="my-10"
        :colors="['orange']"
        :min="min"
        :max="max"
        :data="history.map((h) => [h.date, parseFloat(h.priceUsd).toFixed(2)])"
      >
      </line-chart>

      <h3 class="text-xl my-10">Mejores Ofertas de Cambio</h3>
      <table>
        <tr
          v-for="m in markets"
          :key="`${m.exchangeId}-${m.priceUsd}`"
          class="border-b"
        >
          <td>
            <b>{{ m.exchangeId }}</b>
          </td>
          <td>{{ m.priceUsd | dollar }}</td>
          <td>{{ m.baseSymbol }} / {{ m.quoteSymbol }}</td>
          <td>
            <px-button
              :is-loading="m.isLoading || false"
              v-if="!m.url"
              @custom-click="getWebSite(m)"
            >
              <slot>Obtener link</slot>
            </px-button>
            <a
              v-else
              :href="m.url"
              class="hover:underline text-green-600"
              target="_blanck"
            >
              {{ m.url }}
            </a>
          </td>
        </tr>
      </table>
    </template>
  </div>
</template>

<script>
// Realizamos la importacion de la api
import api from '@/api'

// Realizamos la importacion del PxButton
import PxButton from '@/components/PxButton'

export default {
  name: 'CoinDetail',

  components: {
    PxButton,
  },

  data() {
    return {
      asset: {},
      history: [],
      isLoading: false,
      markets: [],
      fromUsd: true,
      convertValue: null,
    }
  },

  // Hook created
  created() {
    // Cada vez que el componente se crea llama a esta funcion
    this.getCoin()
  },

  //Watch le decimos a vue que observe cambios en la propieda que elijamos
  watch: {
    $route() {
      this.getCoin()
    },
  },

  methods: {
    //Se encarga de obtener la informacion del API
    getCoin() {
      /**
       * $route propiedad que se agrega a cada componente
       * cuando estamos trabajando con vue-router,
       * este respresenta toda la info de la ruta
       */
      const id = this.$route.params.id

      // Cambiamos el valor de isLoading o el spinner
      this.isLoading = true

      // Nos permite manejar varias promesas a traves de un array
      Promise.all([
        api.getAsset(id),
        api.getAssetHistory(id),
        api.getMarkets(id),
      ])
        .then(([asset, history, markets]) => {
          ;(this.asset = asset),
            (this.history = history),
            (this.markets = markets)
        })
        .finally(() => (this.isLoading = false))
    },

    getWebSite(exchange) {
      // Cambiamos el valor de isLoading o el spinner
      this.$set(exchange, 'isLoading', true)

      return api
        .getExchange(exchange.exchangeId)
        .then((res) => {
          /**
           * this.$set(), herramienta de vue para los problemas de reactividad
           * permite agregar un nuevo atributo a un objeto o array ya
           * creado y traqueado por Vue
           */
          this.$set(exchange, 'url', res.exchangeUrl)
        })
        .finally(() => {
          // Cambiamos el valor de isLoading o el spinner
          this.$set(exchange, 'isLoading', false)
        })
    },

    toggleConverter() {
      this.fromUsd = !this.fromUsd
    },
  },

  computed: {
    convertResult() {
      if (!this.convertValue) {
        return 0
      }

      const result = this.fromUsd
        ? this.convertValue / this.asset.priceUsd
        : this.convertValue * this.asset.priceUsd

      return result.toFixed(4)
    },

    /**
     * Calcula el precio mininimo de la moneda
     * */
    min() {
      return Math.min(
        ...this.history.map((value) => parseFloat(value.priceUsd).toFixed(2))
      )
    },
    /**
     * Calcula el precio maximo de la moneda
     * */
    max() {
      return Math.max(
        ...this.history.map((value) => parseFloat(value.priceUsd).toFixed(2))
      )
    },
    /**
     * Calcula el promedio de la moneda
     * utilizando la funcion reduce
     * */
    avg() {
      return (
        this.history.reduce((a, b) => a + parseFloat(b.priceUsd), 0) /
        this.history.length
      )
    },
  },
}
</script>

<style scoped>
td {
  padding: 10px;
  text-align: center;
}
</style>
