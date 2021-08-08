<template>
  <main>
    <px-header :links="links"></px-header>

    <!-- Componente proporcionado por vue-router 
    Nos indica donde va a ir el componente dependiendo de la ruta -->
    <router-view class="container px-5 sm:px-20 py-20 flex justify-center" />
  </main>
</template>

<script>
// Realizamos la importacion de compontente
import PxHeader from '@/components/PxHeader'

// Exportacion de parte de Ecmascript
export default {
  // Definimos el nombre (Buenas practicas)
  name: 'App',
  // Definimos los componentes importados
  components: {
    PxHeader,
  },

  // Lista de links que le pasamos al PxHeader
  data() {
    return {
      links: [
        {
          title: 'BTC',
          to: { name: 'coin-detail', params: { id: 'bitcoin' } },
        },
        {
          title: 'ETH',
          to: { name: 'coin-detail', params: { id: 'ethereum' } },
        },
        {
          title: 'XRP',
          to: { name: 'coin-detail', params: { id: 'XRP' } },
        },
      ],
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
