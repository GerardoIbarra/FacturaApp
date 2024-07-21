import { computed, ref } from 'vue';
import { Payment, ListResponse, CfdiData } from '../../../interface/interface';
import apiClient from '../../../components/app/response/httpService';
import { handleRequest } from '../../../components/app/response/handleResponse';
import { StatusType } from '../../../interface/interface'; // Importa el tipo específico

/**
 * Hook para manejar CDFI
 * @returns {{
 *   listResponse: import("vue").Ref<ListResponse | null>,
 *   cancelResponse: import("vue").Ref<any>,
 *   emailResponse: import("vue").Ref<any>,
 *   error: import("vue").Ref<string | null>,
 *   isLoading: import("vue").Ref<boolean>,
 *   fetchCdfiList: () => Promise<void>,
 *   cancelCdfi: (cfdiUid: string, motivo: string, folioSustituto: string) => Promise<void>,
 *   sendEmailCfdi: (cfdiUid: string) => Promise<void>,
 * }}
 */
export function useCdfi() {
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

  const capitalizeFirstLetter = (string: string) => 
    string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();

  const totalPages = computed(() => 
    Math.ceil(total.value / perPage.value)
  );

  const fetchCdfiList = async (page = 1, perPageVal = 15) => {
    isLoading.value = true;
    try {
      const response = await apiClient.get(`/factura/list?page=${page}&per_page=${perPageVal}`);
      if (response.data && Array.isArray(response.data.data)) {
        response.data.data = response.data.data.map((payment: Payment) => ({
          ...payment,
          Total: `$${parseFloat(payment.Total).toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`,
          Status: capitalizeFirstLetter(payment.Status) as StatusType, 
        }));
        listResponse.value = response.data;

        if (listResponse.value) {
          total.value = listResponse.value.total;
          from.value = listResponse.value.from;
          to.value = listResponse.value.to;
          perPage.value = listResponse.value.per_page;
          currentPage.value = listResponse.value.current_page;
        }

        console.log('Datos cargados:', listResponse.value);
      } else {
        throw new Error('Estructura de datos no válida');
      }
    } catch (err) {
      error.value = err.message || 'An error occurred';
      console.error('Error al cargar los datos:', err);
    } finally {
      isLoading.value = false;
    }
  };

  const cancelCdfi = async (cfdiUid: string, motivo: string, folioSustituto: string) => {
    const data = { motivo, folioSustituto };
    await handleRequest(
      apiClient.post(`/factura/cancel/${cfdiUid}`, data),
      '¡Se cancelo correctamente Enviado!'
    );
  };

  const sendEmailCfdi = async (cfdiUid: string) => {
    await handleRequest(
      apiClient.get(`/factura/cfdi/${cfdiUid}/email`),
      '¡Correo Enviado!'
    );
  };

  const createCfdi = async (cfdiData: CfdiData) => {
    isLoading.value = true;
    try {
      await handleRequest(
        apiClient.post('/factura/cfdi40/create', cfdiData),
        '¡CFDI Creado!'
      );
    } catch (err) {
      console.error('Error al crear el CFDI:', err);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    listResponse,
    cancelResponse,
    emailResponse,
    error,
    isLoading,
    fetchCdfiList,
    cancelCdfi,
    sendEmailCfdi,
    currentPage,
    perPage,
    perPageOptions,
    total,
    from,
    to,
    totalPages,
    createCfdi,
  };
}
