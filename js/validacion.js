export const valida = input => {
  const tipoInput = input.dataset.tipo;
  if (validadores[tipoInput]) {
    validadores[tipoInput](input);
  }
  if (input.validity.valid) {
    input.parentElement.classList.remove('input-container--invalid');
    input.parentElement.querySelector('.input-message-error').innerHTML = '';
  } else {
    input.parentElement.classList.add('input-container--invalid');
    input.parentElement.querySelector('.input-message-error').innerHTML = mostrarMensajeError(tipoInput, input);
  }
}

const tipoError = [
  'valueMissing',
  'typeMismatch',
  'patternMismatch',
  'customError',
];

const mensajeError = {
  nombre: {
    valueMissing: 'Este campo nombre no puede estar vacio',
  },
  email: {
    valueMissing: 'Este campo no puede estar vacio',
    typeMismatch: 'El correo no es válido',
  },
  password: {
    valueMissing: 'Este campo no puede estar vacio',
    patternMismatch:
      'Mínimo 6 caracteres, máximo 12 caracteres. Debe contener una letra mayuscula, un número y no deben existir caracteres especiales',
  },
  nacimiento: {
    valueMissing: 'Este campo no puede estar vacio',
    customError: 'Debes tener al menos 18 años',
  },
  numero: {
    valueMissing: 'Este campo no puede estar vacio',
    patternMismatch: 'El patrón requerido es xxxxxxxxxx',
  },
  direccion: {
    valueMissing: 'Este campo no puede estar vacio',
    patternMismatch: 'La direccion debe contener entre 10 y 40 caracteres',
  },
  ciudad: {
    valueMissing: 'Este campo no puede estar vacio',
    patternMismatch: 'La ciudad debe contener entre 10 y 40 caracteres',
  },
  estado: {
    valueMissing: 'Este campo no puede estar vacio',
    patternMismatch: 'La direccion debe contener entre 10 y 40 caracteres',
  },
};

const mostrarMensajeError = (tipoInput, input) => {
  let mensaje = '';
  tipoError.forEach(error => {
    if (input.validity[error]) {
      mensaje = mensajeError[tipoInput][error];
    }
  })
  return mensaje;
};

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