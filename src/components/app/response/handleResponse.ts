import Swal from 'sweetalert2';
import { handleHttpError } from '../../app/error/main';

export async function handleRequest(promise: Promise<any>, successMessage: string) {
  try {
    const response = await promise;
    Swal.fire({
      icon: 'success',
      title: successMessage,
      text: 'La operación se completó exitosamente',
      customClass: {
        confirmButton: 'btn btn-success',
      },
    });
    return response.data;
  } catch (err) {
    handleHttpError(err);
    throw err;
  }
}
