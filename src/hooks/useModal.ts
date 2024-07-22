import { CfdiData } from "../interface/interface";
import apiClient from "../components/app/response/httpService";
import { handleRequest } from "../components/app/response/handleResponse";
import { ref } from "vue";

const useCdfiState = () => {
  const isLoading = ref<boolean>(false);
  const Receptor = ref<string>("");
  const Factura = ref<string>("");
  return {
    isLoading,
    Receptor,
    Factura,
  };
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

export function useModal() {
  const state = useCdfiState();

  return {
    ...state,
    createCfdi: (cfdiData: CfdiData) => createCfdi(cfdiData),
  };
}
