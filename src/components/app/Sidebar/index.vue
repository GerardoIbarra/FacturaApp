<template>
  <div :class="`side-nav ${isSlim ? 'slim' : ''}`">
    <div class="bg-background w-full space-y-2 py-2">
      <div class="flex items-center justify-between px-4 py-2">
        <img class="imageReport" src="@/assets/logo.svg" width="180px" />
        <button
          @click="ClickSidebar(), $emit('toggle-slim')"
          class="btn-slim-toggle"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-arrows-diagonal-2"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M16 20l4 0l0 -4" />
            <path d="M14 14l6 6" />
            <path d="M8 4l-4 0l0 4" />
            <path d="M4 4l6 6" />
          </svg>
        </button>
      </div>

      <div class="px-3 py-1">
        <div>
          <Button variant="ghost" class="w-full justify-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              class="mr-2 h-7 w-7"
            >
              <rect width="7" height="7" x="3" y="3" rx="1" />
              <rect width="7" height="7" x="14" y="3" rx="1" />
              <rect width="7" height="7" x="14" y="14" rx="1" />
              <rect width="7" height="7" x="3" y="14" rx="1" />
            </svg>
            General
          </Button>
        </div>
      </div>

      <div class="px-3 py-1">
        <div>
          <Button variant="ghost" class="w-full justify-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-inbox mr-2 h-7 w-7"
              width="44"
              height="44"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path
                d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"
              />
              <path d="M4 13h3l3 3h4l3 -3h3" />
            </svg>
            Buzon tribunal
          </Button>
        </div>
      </div>
      <div class="px-3 py-1">
        <div>
          <Button variant="ghost" class="w-full justify-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-credit-card-pay mr-2 h-7 w-7"
              width="44"
              height="44"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path
                d="M12 19h-6a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v4.5"
              />
              <path d="M3 10h18" />
              <path d="M16 19h6" />
              <path d="M19 16l3 3l-3 3" />
              <path d="M7.005 15h.005" />
              <path d="M11 15h2" />
            </svg>
            Recordatorio de pagos
          </Button>
        </div>
      </div>
      <div class="px-3 py-1">
        <div>
          <Button variant="ghost" class="w-full justify-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-adjustments-horizontal mr-2 h-7 w-7"
              width="44"
              height="44"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M14 6m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
              <path d="M4 6l8 0" />
              <path d="M16 6l4 0" />
              <path d="M8 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
              <path d="M4 12l2 0" />
              <path d="M10 12l10 0" />
              <path d="M17 18m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
              <path d="M4 18l11 0" />
              <path d="M19 18l1 0" />
            </svg>
            Configuraciones
          </Button>
        </div>
      </div>
      <div class="px-3 py-1">
        <div>
          <Button variant="ghost" class="w-full justify-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-apps mr-2 h-7 w-7"
              width="44"
              height="44"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path
                d="M4 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z"
              />
              <path
                d="M4 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z"
              />
              <path
                d="M14 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z"
              />
              <path d="M14 7l6 0" />
              <path d="M17 4l0 6" />
            </svg>
            Apps
          </Button>
        </div>
      </div>
      <div class="px-3 py-1">
        <div>
          <Button variant="ghost" class="w-full justify-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-user-code mr-2 h-7 w-7"
              width="44"
              height="44"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
              <path d="M6 21v-2a4 4 0 0 1 4 -4h3.5" />
              <path d="M20 21l2 -2l-2 -2" />
              <path d="M17 17l-2 2l2 2" />
            </svg>
            Desarrolladores
          </Button>
        </div>
      </div>

      <div class="px-3 py-2">
        <h2 class="mb-2 px-4 text-lg font-semibold tracking-tight">CFDi´s</h2>
        <div class="space-y-1">
          <Button class="w-full justify-start dark:bg-neutral-500 bg-zinc-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="44"
              height="44"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="mr-2 h-7 w-7"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M14 3v4a1 1 0 0 0 1 1h4" />
              <path
                d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"
              />
              <path d="M11 14h1v4h1" />
              <path d="M12 11h.01" />
            </svg>
            Historial</Button
          >
          <Button variant="ghost" class="w-full justify-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="mr-2 h-7 w-7"
              width="44"
              height="44"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M14 3v4a1 1 0 0 0 1 1h4" />
              <path
                d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"
              />
              <path d="M12 17v-6" />
              <path d="M9.5 14.5l2.5 2.5l2.5 -2.5" />
            </svg>
            Reportes y descargas
          </Button>
          <Button variant="ghost" class="w-full justify-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-file-check mr-2 h-7 w-7"
              width="44"
              height="44"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M14 3v4a1 1 0 0 0 1 1h4" />
              <path
                d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"
              />
              <path d="M9 15l2 2l4 -4" />
            </svg>
            Complementos de pago
          </Button>
          <Button variant="ghost" class="w-full justify-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-file-3d mr-2 h-7 w-7"
              width="44"
              height="44"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M14 3v4a1 1 0 0 0 1 1h4" />
              <path
                d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"
              />
              <path d="M12 13.5l4 -1.5" />
              <path d="M8 11.846l4 1.654v4.5l4 -1.846v-4.308l-4 -1.846z" />
              <path d="M8 12v4.2l4 1.8" />
            </svg>

            Migrar CFDi´s
          </Button>
          <Button variant="ghost" class="w-full justify-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-file-search mr-2 h-7 w-7"
              width="44"
              height="44"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M14 3v4a1 1 0 0 0 1 1h4" />
              <path
                d="M12 21h-5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v4.5"
              />
              <path
                d="M16.5 17.5m-2.5 0a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0 -5 0"
              />
              <path d="M18.5 19.5l2.5 2.5" />
            </svg>

            Carta porte
          </Button>
          <Button variant="ghost" class="w-full justify-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-file-alert mr-2 h-7 w-7"
              width="44"
              height="44"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M14 3v4a1 1 0 0 0 1 1h4" />
              <path
                d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"
              />
              <path d="M12 17l.01 0" />
              <path d="M12 11l0 3" />
            </svg>

            CFDI de retención
          </Button>
        </div>
      </div>
    </div>
    <div class="px-3 py-2">
      <h2 class="mb-2 px-4 text-lg font-semibold tracking-tight">Catálogos</h2>
      <div class="space-y-1">
        <Button variant="ghost" class="w-full justify-start">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="44"
            height="44"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="mr-2 h-7 w-7"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
            <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
          </svg>

          Clientes
        </Button>
        <Button variant="ghost" class="w-full justify-start">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="44"
            height="44"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="mr-2 h-7 w-7"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
            <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
          </svg>

          Empleados
        </Button>
        <Button variant="ghost" class="w-full justify-start">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-pig-money mr-2 h-7 w-7"
            width="44"
            height="44"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M15 11v.01" />
            <path d="M5.173 8.378a3 3 0 1 1 4.656 -1.377" />
            <path
              d="M16 4v3.803a6.019 6.019 0 0 1 2.658 3.197h1.341a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-1.342c-.336 .95 -.907 1.8 -1.658 2.473v2.027a1.5 1.5 0 0 1 -3 0v-.583a6.04 6.04 0 0 1 -1 .083h-4a6.04 6.04 0 0 1 -1 -.083v.583a1.5 1.5 0 0 1 -3 0v-2l0 -.027a6 6 0 0 1 4 -10.473h2.5l4.5 -3h0z"
            />
          </svg>
          Impuestos
        </Button>
        <Button variant="ghost" class="w-full justify-start">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-building-store mr-2 h-7 w-7"
            width="44"
            height="44"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M3 21l18 0" />
            <path
              d="M3 7v1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1h-18l2 -4h14l2 4"
            />
            <path d="M5 21l0 -10.15" />
            <path d="M19 21l0 -10.15" />
            <path d="M9 21v-4a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v4" />
          </svg>
          Producto y servicios
        </Button>
        <Button variant="ghost" class="w-full justify-start">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-credit-card mr-2 h-7 w-7"
            width="44"
            height="44"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path
              d="M3 5m0 3a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3z"
            />
            <path d="M3 10l18 0" />
            <path d="M7 15l.01 0" />
            <path d="M11 15l2 0" />
          </svg>
          Mis cunetas bancarias
        </Button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Button } from "@/components/ui/button";
defineProps({
  isSlim: Boolean,
});

const ClickSidebar = () => {
  console.log("click");
};
</script>
<style>
/* Estilos específicos para el botón */
.btn-slim-toggle {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-left: auto;
  display: flex;
  align-items: center;
}
.side-nav {
  transition: width 0.3s;
  overflow: hidden; /* Añadido para evitar desbordamientos */
}

.side-nav.slim {
  width: 64px; /* Ajusta el ancho colapsado según sea necesario */
}

.side-nav:not(.slim) {
  width: 240px; /* Ajusta el ancho expandido según sea necesario */
}
</style>
