<template>
  <table>
    <thead>
      <tr class="bg-gray-100 border-b-2 border-gray-400">
        <th></th>
        <th :class="{ up: this.sortOrder === 1, down: this.sortOrder === -1 }">
          <span class="underline cursor-pointer" @click="changeSortOrder"
            >Ranking
          </span>
        </th>
        <th>Nombre</th>
        <th>Precio</th>
        <th>Cap. de Mercado</th>
        <th>Variación 24hs</th>
        <td class="hidden sm:block">
          <input
            class="bg-gray-100 focus:outline-none border-b border-gray-400 py-2 px-4 block w-full appearance-none leading-normal"
            id="filter"
            placeholder="Buscar..."
            type="text"
            v-model="filter"
          />
        </td>
      </tr>
    </thead>
    <tbody>
      <!-- Realizamos un v-for para agregar todos los datos que estan en assets -->
      <tr
        v-for="a in filteredAssets"
        :key="a.id"
        class="border-b border-gray-200 hover:bg-orange-100"
      >
        <td>
          <img
            class="w-6 h-auto"
            :src="`https://static.coincap.io/assets/icons/${a.symbol.toLowerCase()}@2x.png`"
            :alt="a.name"
          />
        </td>
        <td>
          <b># {{ a.rank }}</b>
        </td>
        <td>
          <!-- Le pasamos un objeto al router para no usar la url si no el nombre -->
          <router-link
            class="hover:underline text-green-600"
            :to="{ name: 'coin-detail', params: { id: a.id } }"
          >
            {{ a.name }}
          </router-link>
          <small class="ml-1 text-gray-500">
            {{ a.symbol }}
          </small>
        </td>
        <!-- Aplicamos el filtro de dollarFiltro -->
        <td>{{ a.priceUsd | dollar }}</td>
        <td>{{ a.marketCapUsd | dollar }}</td>
        <!-- Aplicamos el filtro de percentFilter -->
        <td
          :class="
            a.changePercent24Hr.includes('-')
              ? 'text-red-600'
              : 'text-green-600'
          "
        >
          {{ a.changePercent24Hr | percent }}
        </td>
        <td class="hidden sm:block">
          <px-button @custom-click="goToCoin(a.id)">
            <span>Detalle</span>
          </px-button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
// Realizamos la importacion de un componente
import PxButton from '@/components/PxButton'

// Configuramos la exportacion del componente
export default {
  // Definimos el nombre (Buenas practicas)
  name: 'PxAssetsTable',
  // Definimos una propiedad con su tipo y valor default
  props: {
    assets: {
      // Tipo de la propiedad
      type: Array,
      // Valor default que es una funcion que retorna ya sea un objeto o un array
      default: () => [],
    },
  },
  //Agregamos los componentes importados
  components: {
    PxButton,
  },

  data() {
    return {
      filter: '',
      sortOrder: 1,
    }
  },

  computed: {
    filteredAssets() {
      const altOrder = this.sortOrder === 1 ? -1 : 1

      /**
       * Filtramos el los valores a traves de la funcion filter de JS
       * utilizando includes() le preguntamos si lo que se pasa por filter
       * existe en assets y si es asi que lo retorne ya sea el nombre o symbol
       * */
      return this.assets
        .filter(
          (a) =>
            a.symbol.toLowerCase().includes(this.filter.toLowerCase()) ||
            a.name.toLowerCase().includes(this.filter.toLowerCase())
        )
        .sort((a, b) => {
          if (parseInt(a.rank) > parseInt(b.rank)) {
            return this.sortOrder
          }

          return altOrder
        })
    },
  },

  methods: {
    /**
     * $router objeto de vue-router y nos permite
     * navegar a traves de codigo
     */
    goToCoin(id) {
      this.$router.push({ name: 'coin-detail', params: { id } })
    },

    /**
      Cambia el valor de sortOrder y de esa manera se
      orgina de forma ascendente o de forma descente
    */
    changeSortOrder() {
      this.sortOrder = this.sortOrder === 1 ? -1 : 1
    },
  },
}
</script>

<style scoped>
.up::before {
  content: '👆';
}

.down::before {
  content: '👇';
}

td {
  padding: 20px 0px;
  font-size: 0.6rem;
  text-align: center;
}

th {
  padding: 5px;
  font-size: 0.6rem;
}

@media (min-width: 640px) {
  td,
  th {
    padding: 20px;
    font-size: 1rem;
  }

  th {
    padding: 12px;
  }
}
</style>
