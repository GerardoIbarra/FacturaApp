<template>
  <div class="border-t flex">
    <Sidebar
      :is-slim="isSlim"
      @toggle-slim="toggleSlim"
      class="hidden lg:block"
    />
    <div class="flex-1 h-full lg:h-screen">
      <div class="h-full px-4 py-6 lg:px-8">
        <div>
          <Navbar />
          <div>
            <Breadcrumb />
            <IndexCdfi />
          </div>
        </div>
      </div>
    </div>
    <!-- Sidebar para pantallas pequeñas -->
    <div class="lg:hidden">
      <Sidebar :is-slim="isSlim" @toggle-slim="toggleSlim" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Sidebar from "../components/app/sidebar/index.vue";
import Navbar from "../components/app/navbar/index.vue";
import IndexCdfi from "../components/app/cdfi/cdfiIndex.vue";
import Breadcrumb from "../components/app/breadcrumbs/breadcrumbs.vue";

const isSlim = ref(false);
const toggleSlim = () => {
  isSlim.value = !isSlim.value;
};
</script>

<style scoped>
.flex {
  display: flex;
}

.flex-1 {
  flex: 1;
}

.border-t {
  border-top: 1px solid #e5e7eb; /* Ajusta el color según sea necesario */
}

.h-full {
  height: 100%;
}

.lg\:h-screen {
  height: 100vh;
}
</style>
