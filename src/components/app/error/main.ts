import Swal from 'sweetalert2';

export function handleHttpError(error: any) {
  let message = 'An error occurred';
  if (error.response) {
    const status = error.response.status;
    if (status >= 400 && status < 500) {
      message = error.response.data.errors?.error || 'Client error occurred';
    } else if (status >= 500) {
      message = 'Server error occurred';
    }
  } else if (error.request) {
    message = 'No response from the server';
  } else {
    message = error.message;
  }

  Swal.fire({
    icon: 'error',
    title: 'Error',
    text: message,
    customClass: {
      confirmButton: 'btn btn-secondary',
    },
  });
}
