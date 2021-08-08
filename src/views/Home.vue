<template>
  <div>
    <sync-loader
      :loading="isLoading"
      :color="'#68d391'"
      :size="25"
    ></sync-loader>
    <px-assets-table v-if="!isLoading" v-bind:assets="assets"></px-assets-table>
  </div>
</template>

<script>
// Realizamos la importacion de la API
import api from '@/api'

// Realizamos la importacion del componente
import PxAssetsTable from '@/components/PxAssetsTable'

// Realizamos la exportacion del componente
export default {
  name: 'home',
  components: {
    PxAssetsTable,
  },
  data() {
    return {
      isLoading: false,
      assets: [],
    }
  },
  // Hook created
  created() {
    this.isLoading = true

    api
      .getAssets()
      .then((assets) => (this.assets = assets))
      .finally(() => (this.isLoading = false))
  },
}
</script>
