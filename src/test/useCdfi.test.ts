import { useCdfi } from "../components/app/cdfi/useCdfi";
import apiClient from "../components/app/response/httpService";
import Swal from "sweetalert2";
import MockAdapter from "axios-mock-adapter";

jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
}));

const mock = new MockAdapter(apiClient);

describe("useCdfi", () => {
  afterEach(() => {
    mock.reset();
    jest.clearAllMocks();
  });

  it("should fetch CFDI list", async () => {
    const { fetchCdfiList, listResponse } = useCdfi();
    const mockData = {
      total: 1,
      per_page: 20,
      current_page: 1,
      last_page: 1,
      from: 1,
      to: 1,
      data: [
        {
          UUID: "123",
          UID: "123",
          Folio: "123",
          FechaTimbrado: "2021-01-01",
          Receptor: "ABC",
          RazonSocialReceptor: "XYZ Corp",
          ReferenceClient: 1,
          Total: "100.00",
          Subtotal: "80.00",
          NumOrder: null,
          Status: "active",
          Version: "4.0",
        },
      ],
    };

    mock.onGet("/factura/list?page=1&per_page=15").reply(200, mockData);

    await fetchCdfiList(1, 15);

    expect(listResponse.value).toEqual(mockData);
  });

  it("should handle error in fetchCdfiList", async () => {
    const { fetchCdfiList } = useCdfi();

    mock.onGet("/factura/list?page=1&per_page=15").reply(500);

    try {
      await fetchCdfiList(1, 15);
    } catch (e) {
      expect(Swal.fire).toHaveBeenCalledWith({
        icon: "error",
        title: "Error",
        text: "Server error occurred",
        customClass: {
          confirmButton: "btn btn-secondary",
        },
      });
    }
  });

  it("should cancel CFDI", async () => {
    const { cancelCdfi } = useCdfi();
    mock.onPost("/factura/cancel/123").reply(200);

    await cancelCdfi("123", "motivo", "folio");

    expect(Swal.fire).toHaveBeenCalledWith({
      icon: "success",
      title: "¡Se cancelo correctamente Enviado!",
      text: "La operación se completó exitosamente",
      customClass: {
        confirmButton: "btn btn-success",
      },
    });
  });

  it("should handle error in cancelCdfi", async () => {
    const { cancelCdfi } = useCdfi();
    mock.onPost("/factura/cancel/123").reply(500);

    try {
      await cancelCdfi("123", "motivo", "folio");
    } catch (e) {
      expect(Swal.fire).toHaveBeenCalledWith({
        icon: "error",
        title: "Error",
        text: "Server error occurred",
        customClass: {
          confirmButton: "btn btn-secondary",
        },
      });
    }
  });

  // Add similar tests for sendEmailCfdi and createCfdi
});
