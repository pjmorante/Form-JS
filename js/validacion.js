export const valida = input => {
  const tipoInput = input.dataset.tipo;
  if (validadores[tipoInput]) {
    validadores[tipoInput](input);
  }
}

const validadores = {
  nacimiento: (input) => validarNacimiento(input),
};

const validarNacimiento = input => {
  const fechaCliente = new Date(input.value);
  let mensaje = '';
  if (!mayorEdad(fechaCliente)){
    mensaje = 'Debes tener al menos 18 años';
  };
  input.setCustomValidity(mensaje);
}

const mayorEdad = fecha => {
  const fechaActual = new Date();
  const diferenciaFechas = new Date(fecha.getUTCFullYear() + 18, fecha.getUTCMonth(), fecha.getUTCDate());
  return diferenciaFechas <= fechaActual;
}