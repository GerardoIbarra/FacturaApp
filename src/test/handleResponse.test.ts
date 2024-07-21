import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { handleRequest } from "../components/app/response/handleResponse";
import Swal from "sweetalert2";

jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
}));

const mock = new MockAdapter(axios);

describe("handleRequest", () => {
  afterEach(() => {
    mock.reset();
    jest.clearAllMocks();
  });

  it("should handle a successful request", async () => {
    mock.onGet("/success").reply(200, { data: "test" });

    const result = await handleRequest(
      axios.get("/success"),
      "Success message"
    );

    expect(result).toEqual({ data: "test" });
    expect(Swal.fire).toHaveBeenCalledWith({
      icon: "success",
      title: "Success message",
      text: "La operación se completó exitosamente",
      customClass: {
        confirmButton: "btn btn-success",
      },
    });
  });

  it("should handle an error response", async () => {
    mock.onGet("/error").reply(500);

    try {
      await handleRequest(axios.get("/error"), "Success message");
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
});
