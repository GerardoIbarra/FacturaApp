<template>
  <div class="py-5">
    <Card>
      <div class="w-full">
        <div
          class="flex justify-end items-center mt-4 text-gray-800 dark:text-gray-200"
        >
          <div class="mt-4 w-auto px-2 ml-4 flex items-center">
            <button
              @click="openModal()"
              class="text-white bg-blue-500 hover:bg-orange-600 font-medium rounded-lg text-sm px-4 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-orange-600"
            >
              Crear Nuevo
            </button>
          </div>
        </div>
        <CreateCdfiModal :isOpen="isModalOpen" @close="closeModal" />
        <div
          v-if="isLoading"
          class="text-center text-gray-800 dark:text-gray-200 pt-4"
        >
          Cargando...
        </div>
        <div class="rounded-lg pt-4" v-else>
          <table
            v-if="listResponse?.data?.length"
            class="min-w-full bg-white dark:bg-gray-800"
          >
            <thead>
              <tr>
                <th
                  class="py-2 px-4 border-b text-gray-800 dark:text-gray-200 dark:bg-neutral-500 bg-zinc-400 rounded-tl-lg"
                >
                  ID
                </th>
                <th
                  class="py-2 px-4 border-b text-gray-800 dark:text-gray-200 dark:bg-neutral-500 bg-zinc-400"
                >
                  Tipo Documento
                </th>
                <th
                  class="py-2 px-4 border-b text-gray-800 dark:text-gray-200 dark:bg-neutral-500 bg-zinc-400"
                >
                  Folio
                </th>
                <th
                  class="py-2 px-4 border-b text-gray-800 dark:text-gray-200 dark:bg-neutral-500 bg-zinc-400"
                >
                  Serie
                </th>
                <th
                  class="py-2 px-4 border-b text-gray-800 dark:text-gray-200 dark:bg-neutral-500 bg-zinc-400"
                >
                  Total
                </th>
                <th
                  class="py-2 px-4 border-b text-gray-800 dark:text-gray-200 dark:bg-neutral-500 bg-zinc-400"
                >
                  Fecha
                </th>
                <th
                  class="py-2 px-4 border-b text-gray-800 dark:text-gray-200 dark:bg-neutral-500 bg-zinc-400"
                >
                  Status
                </th>
                <th
                  class="py-2 px-4 border-b text-gray-800 dark:text-gray-200 dark:bg-neutral-500 bg-zinc-400 rounded-tr-lg"
                >
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, key) in listResponse.data" :key="row.UUID">
                <td class="py-2 px-4 border-b text-gray-800 dark:text-gray-200">
                  {{ key + 1 }}
                </td>
                <td
                  class="py-2 px-4 border-b text-gray-800 dark:text-gray-200 text-center"
                >
                  {{ row.document }}
                </td>
                <td
                  class="py-2 px-4 border-b text-gray-800 dark:text-gray-200 text-center"
                >
                  {{ row.UUID }}
                </td>
                <td
                  class="py-2 px-4 border-b text-gray-800 dark:text-gray-200 text-center"
                >
                  {{ row.Receptor }}
                </td>
                <td
                  class="py-2 px-4 border-b text-gray-800 dark:text-gray-200 text-center"
                >
                  {{ row.Total }}
                </td>
                <td
                  class="py-2 px-4 border-b text-gray-800 dark:text-gray-200 text-center"
                >
                  {{ row.FechaTimbrado }}
                </td>
                <td
                  class="py-2 px-4 border-b text-gray-800 dark:text-gray-200 text-center"
                  :class="getStatusClass(row.Status)"
                >
                  {{ row.Status }}
                </td>
                <td
                  class="py-2 px-4 border-b text-gray-800 dark:text-gray-200 text-center"
                >
                  <DropdownMenu>
                    <DropdownMenuTrigger as-child>
                      <Button variant="outline">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="icon icon-tabler icon-tabler-dots-circle-horizontal h-7 w-7"
                          width="44"
                          height="44"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="#2c3e50"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path
                            d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"
                          />
                          <path d="M8 12l0 .01" />
                          <path d="M12 12l0 .01" />
                          <path d="M16 12l0 .01" />
                        </svg>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent class="w-auto">
                      <DropdownMenuRadioGroup v-model="position">
                        <DropdownMenuRadioItem value="right">
                          <Button
                            variant="outline"
                            @click="CancelarCdfiAlert(row.UID)"
                            class="flex items-center"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              class="icon icon-tabler icon-tabler-circle-minus h-7 w-7 mr-1"
                              width="44"
                              height="44"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="#2c3e50"
                              fill="none"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            >
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              />
                              <path
                                d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"
                              />
                              <path d="M9 12l6 0" />
                            </svg>
                            <span>Cancelar</span>
                          </Button>
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="right">
                          <Button
                            variant="outline"
                            @click="sendCdfi(row.UID)"
                            class="flex items-center"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              class="icon icon-tabler icon-tabler-mail-fast h-9 w-9 mr-1"
                              width="44"
                              height="44"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="#2c3e50"
                              fill="none"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            >
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              />
                              <path d="M3 7h3" />
                              <path d="M3 11h2" />
                              <path
                                d="M9.02 8.801l-.6 6a2 2 0 0 0 1.99 2.199h7.98a2 2 0 0 0 1.99 -1.801l.6 -6a2 2 0 0 0 -1.99 -2.199h-7.98a2 2 0 0 0 -1.99 1.801z"
                              />
                              <path
                                d="M9.8 7.5l2.982 3.28a3 3 0 0 0 4.238 .202l3.28 -2.982"
                              />
                            </svg>
                            <span>Enviar</span>
                          </Button>
                        </DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            </tbody>
          </table>
          <div v-else class="text-center text-gray-800 dark:text-gray-200">
            No hay datos disponibles
          </div>
        </div>
        <div
          class="flex justify-between items-center mt-4 text-gray-800 dark:text-gray-200 pr-3 pl-3 pb-5"
        >
          <div>
            <span class="text-muted"
              >{{ "Mostrando" }} {{ from }} {{ "al" }} {{ to }}
              {{ "de un total de" }} {{ total }} {{ "registros" }}</span
            >
          </div>
          <Pagination
            v-slot="{ page }"
            :total="totalPages"
            :sibling-count="1"
            show-edges
            :default-page="currentPage"
          >
            <PaginationList v-slot="{ items }" class="flex items-center gap-1">
              <PaginationFirst @click="goToPage(1)" />
              <PaginationPrev @click="goToPage(currentPage - 1)" />
              <template v-for="(item, index) in items">
                <PaginationListItem
                  v-if="item.type === 'page'"
                  :key="index"
                  :value="item.value"
                  as-child
                >
                  <Button
                    class="w-10 h-10 p-0"
                    :variant="item.value === page ? 'default' : 'outline'"
                    @click="goToPage(item.value)"
                  >
                    {{ item.value }}
                  </Button>
                </PaginationListItem>
                <PaginationEllipsis v-else :key="item.type" :index="index" />
              </template>
              <PaginationNext @click="goToPage(currentPage + 1)" />
              <PaginationLast @click="goToPage(totalPages)" />
            </PaginationList>
          </Pagination>
        </div>
      </div>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import Card from "@/components/ui/card/Card.vue";
import { useCdfi } from "../../../hooks/useCdfi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";
import CreateCdfiModal from "./cdfiModal.vue";
import { StatusType } from "../../../interface/interface"; // Importa el tipo específico

const isModalOpen = ref(false);

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const {
  listResponse,
  isLoading,
  fetchCdfiList,
  cancelCdfi,
  sendEmailCfdi,
  currentPage,
  perPage,
  total,
  from,
  to,
  totalPages,
} = useCdfi();

const position = ref("bottom");

const CancelarCdfiAlert = (UID: string) => {
  Swal.fire({
    title: "¿Seguro que quieres cancelar ?",
    text: "Te encuentras a punto de cancelar el CDFI de" + " " + UID,
    icon: "warning",
    showCancelButton: true,
    cancelButtonText: "Cancelar",
    confirmButtonText: "Enviar",
    customClass: {
      confirmButton: "bg-green-500 text-white px-4 py-2 rounded",
      cancelButton:
        "border border-gray-500 text-gray-500 px-4 py-2 rounded ml-1",
    },
    buttonsStyling: false,
  }).then((response: { isConfirmed: boolean }) => {
    if (response.isConfirmed) {
      cancelCdfi(UID, "02", "61d4c0326907f");
    }
  });
};

const sendCdfi = (UID: string) => {
  Swal.fire({
    title: "¿Seguro que quieres enviar al correo ?",
    text: "Te encuentras a punto de enviar al correo de" + " " + UID,
    icon: "question",
    showCancelButton: true,
    cancelButtonText: "Cancelar",
    confirmButtonText: "Enviar",
    customClass: {
      confirmButton: "bg-green-500 text-white px-4 py-2 rounded",
      cancelButton:
        "border border-gray-500 text-gray-500 px-4 py-2 rounded ml-1",
    },
    buttonsStyling: false,
  }).then((response: { isConfirmed: boolean }) => {
    if (response.isConfirmed) {
      sendEmailCfdi(UID);
    }
  });
};

const getStatusClass = (status: StatusType): string => {
  switch (status) {
    case "Enviada":
      return "text-green-500 dark:text-green-500";
    case "Eliminada":
      return "text-red-500 dark:text-red-500";
    case "Pendiente":
      return "text-yellow-500 dark:text-yellow-500";
    default:
      return "text-gray-800 dark:text-gray-200";
  }
};

const goToPage = (page: number) => {
  if (page < 1) page = 1;
  if (page > totalPages.value) page = totalPages.value;
  currentPage.value = page;
  fetchCdfiList(page, perPage.value);
};

onMounted(() => {
  fetchCdfiList(currentPage.value, perPage.value);
});

watch(
  listResponse,
  (newValue) => {
    if (newValue && newValue.current_page) {
      currentPage.value = newValue.current_page;
    }
  },
  { deep: true }
);
</script>
