import { computed, ref } from "vue";
import { Payment, ListResponse, CfdiData } from "../../../interface/interface";
import apiClient from "../../../components/app/response/httpService";
import { handleRequest } from "../../../components/app/response/handleResponse";
import { StatusType } from "../../../interface/interface"; // Importa el tipo específico

const useCdfiState = () => {
  const listResponse = ref<ListResponse | null>(null);
  const cancelResponse = ref<any>(null);
  const emailResponse = ref<any>(null);
  const error = ref<string | null>(null);
  const isLoading = ref<boolean>(false);

  const currentPage = ref<number>(1);
  const perPage = ref<number>(20);
  const perPageOptions = ref<number[]>([5, 10, 15, 20]);
  const total = ref<number>(0);
  const from = ref<number>(0);
  const to = ref<number>(0);

  const totalPages = computed(() => Math.ceil(total.value / perPage.value));

  return {
    listResponse,
    cancelResponse,
    emailResponse,
    error,
    isLoading,
    currentPage,
    perPage,
    perPageOptions,
    total,
    from,
    to,
    totalPages,
  };
};

const capitalizeFirstLetter = (string: string): StatusType => {
  const formatted =
    string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  if (["Enviada", "Eliminada", "Pendiente"].includes(formatted)) {
    return formatted as StatusType;
  }
  throw new Error(`Invalid status: ${string}`);
};

const fetchCdfiList = async (
  state: ReturnType<typeof useCdfiState>,
  page = 1,
  perPageVal = 15
) => {
  state.isLoading.value = true;
  try {
    const response = await apiClient.get(
      `/factura/list?page=${page}&per_page=${perPageVal}`
    );
    if (response.data && Array.isArray(response.data.data)) {
      response.data.data = response.data.data.map((payment: Payment) => ({
        ...payment,
        Total: `$${parseFloat(payment.Total).toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`,
        Status: capitalizeFirstLetter(payment.Status), // Asegúrate de usar el tipo correcto aquí
      }));
      state.listResponse.value = response.data;

      if (state.listResponse.value) {
        state.total.value = state.listResponse.value.total;
        state.from.value = state.listResponse.value.from;
        state.to.value = state.listResponse.value.to;
        state.perPage.value = state.listResponse.value.per_page;
        state.currentPage.value = state.listResponse.value.current_page;
      }

      console.log("Datos cargados:", state.listResponse.value);
    } else {
      throw new Error("Estructura de datos no válida");
    }
  } catch (err) {
    state.error.value = err.message || "An error occurred";
    console.error("Error al cargar los datos:", err);
  } finally {
    state.isLoading.value = false;
  }
};

const cancelCdfi = async (
  cfdiUid: string,
  motivo: string,
  folioSustituto: string
) => {
  const data = { motivo, folioSustituto };
  await handleRequest(
    apiClient.post(`/factura/cancel/${cfdiUid}`, data),
    "¡Se cancelo correctamente Enviado!"
  );
};

const sendEmailCfdi = async (cfdiUid: string) => {
  await handleRequest(
    apiClient.get(`/factura/cfdi/${cfdiUid}/email`),
    "¡Correo Enviado!"
  );
};

const createCfdi = async (cfdiData: CfdiData) => {
  const state = useCdfiState();
  state.isLoading.value = true;
  try {
    await handleRequest(
      apiClient.post("/factura/cfdi40/create", cfdiData),
      "¡CFDI Creado!"
    );
  } catch (err) {
    console.error("Error al crear el CFDI:", err);
  } finally {
    state.isLoading.value = false;
  }
};

export function useCdfi() {
  const state = useCdfiState();

  return {
    ...state,
    fetchCdfiList: (page = 1, perPageVal = 15) =>
      fetchCdfiList(state, page, perPageVal),
    cancelCdfi,
    sendEmailCfdi,
    createCfdi: (cfdiData: CfdiData) => createCfdi(cfdiData),
  };
}
