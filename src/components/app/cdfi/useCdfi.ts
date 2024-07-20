import axios from "axios";
import Swal from "sweetalert2";
import { computed, ref } from "vue";

interface Payment {
  UUID: string;
  UID: string;
  Folio: string;
  FechaTimbrado: string;
  Receptor: string;
  RazonSocialReceptor: string;
  ReferenceClient: number;
  Total: string;
  Subtotal: string;
  NumOrder: string | null;
  Status: string;
  Version: string;
  document?: string;
}

interface ListResponse {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  from: number;
  to: number;
  data: Payment[];
}

interface Concepto {
  ClaveProdServ: string;
  Cantidad: number;
  ClaveUnidad: string;
  Unidad: string;
  ValorUnitario: number;
  Descripcion: string;
  AddendaEnvasesUniversales: Addenda;
  Impuestos: Impuestos;
}

interface Addenda {
  idFactura: string;
  fechaMensaje: string;
  idTransaccion: string;
  transaccion: string;
  consecutivo: string;
  idPedido: string;
  albaran: string;
  monedaCve: string;
  tipoCambio: number;
  totalM: string;
  subtotalM: string;
  impuestoM: string;
  baseImpuesto: number;
}

interface Traslado {
  Base: number;
  Impuesto: string;
  TipoFactor: string;
  TasaOCuota: number;
  Importe: number;
}

interface Local {
  Base: number;
  Impuesto: string;
  TipoFactor: string;
  TasaOCuota: number;
  Importe: number;
}

interface Impuestos {
  Traslados: Traslado[];
  Locales: Local[];
}

interface CfdiData {
  Receptor: {
    UID: string;
  };
  TipoDocumento: string;
  Conceptos: Concepto[];
  UsoCFDI: string;
  Serie: number;
  FormaPago: string;
  MetodoPago: string;
  Moneda: string;
  EnviarCorreo: boolean;
}

/**
 * Hook para manejar CDFI
 * @returns {{
 *   listResponse: import("vue").Ref<ListResponse | null>,
 *   cancelResponse: import("vue").Ref<any>,
 *   emailResponse: import("vue").Ref<any>,
 *   error: import("vue").Ref<string | null>,
 *   isLoading: import("vue").Ref<boolean>,
 *   fetchCdfiList: () => Promise<void>,
 *   cancelCdfi: () => Promise<void>,
 *   sendEmailCfdi: (cfdiUid: string) => Promise<void>,
 * }}
 */
export function useCdfi() {
  const listResponse = ref<ListResponse | null>(null);
  const cancelResponse = ref(null);
  const emailResponse = ref(null);
  const error = ref<string | null>(null);
  const isLoading = ref(false);

  const currentPage = ref(1);
  const perPage = ref(20);
  const perPageOptions = ref([5, 10, 15, 20]);
  const total = ref(0);
  const from = ref(0);
  const to = ref(0);

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  const totalPages = computed(() => {
    return Math.ceil(total.value / perPage.value);
  });

  const fetchCdfiList = async (page = 1, perPage = 15) => {
    isLoading.value = true;
    try {
      const response = await axios.get(
        `http://localhost:3000/api/factura/list?page=${page}&per_page=${perPage}`
      );
      if (response.data && Array.isArray(response.data.data)) {
        response.data.data = response.data.data.map((payment: Payment) => ({
          ...payment,
          Total: `$${parseFloat(payment.Total).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`,
          Status: capitalizeFirstLetter(payment.Status),
        }));
        listResponse.value = response.data;

        if (listResponse.value) {
          total.value = listResponse.value.total;
          from.value = listResponse.value.from;
          to.value = listResponse.value.to;
          perPage.value = listResponse.value.per_page;
          currentPage.value = listResponse.value.current_page;
        }

        console.log("Datos cargados:", listResponse.value);
      } else {
        throw new Error("Estructura de datos no válida");
      }
    } catch (err) {
      error.value = err.message || "An error occurred";
      console.error("Error al cargar los datos:", err);
    } finally {
      isLoading.value = false;
    }
  };

  const cancelCdfi = async (
    cfdiUid: string,
    motivo: string,
    folioSustituto: string
  ) => {
    try {
      const data = { motivo, folioSustituto };
      await axios
        .post(`http://localhost:3000/api/factura/cancel/${cfdiUid}`, data)
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "¡Se cancelo correctamente Enviado!",
            text: `Se cancelo el CFDI, fue enviado exitosamente`,
            customClass: {
              confirmButton: "btn btn-success",
            },
          });
        })
        .catch((err) => handAlert(err));
    } catch (err) {
      handAlert(err);
    }
  };

  const sendEmailCfdi = async (cfdiUid: string) => {
    try {
      await axios
        .get(`http://localhost:3000/api/factura/cfdi/${cfdiUid}/email`)
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "¡Correo Enviado!",
            text: `El correo fue enviado exitosamente`,
            customClass: {
              confirmButton: "btn btn-success",
            },
          });
        })
        .catch((err) => handAlert(err));
    } catch (err) {
      handAlert(err);
    }
  };

  const handAlert = (err: any) => {
    console.error(err);
    if (typeof err.response !== "undefined") {
      Swal.fire({
        icon: "error",
        title: "¡Error!",
        text: `${err.response.data.errors.error}`,
        customClass: {
          confirmButton: "btn btn-secondary",
        },
      });
    }
  };

  const createCfdi = async (cfdiData : CfdiData) => {
  isLoading.value = true;
  try {
    await axios.post(`http://localhost:3000/api/factura/cfdi40/create`, cfdiData)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "¡CFDI Creado!",
          text: `El CFDI ha sido creado exitosamente.`,
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
      })
      .catch((err) => handAlert(err));
  } catch (err) {
    handAlert(err);
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
