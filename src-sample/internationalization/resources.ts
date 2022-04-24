/**
 * @packageDocumentation
 * @hidden
 * Has the resources for all the translations in the app.
 */

/**
 *  Language resources.
 */
const resources = {
  es: {
    Home: {
      Example: 'Some sample text',
    },
    Error: {
      NOT_DEFINED: 'Ha ocurrido un error. Por favor, vuelve a intentarlo más tarde.',
      INVALID_PARAMS: 'Parámetros no válidos.',
      NOT_AUTHORIZED: 'No está autorizado.',

      // API.
      API_ONLY_HTTPS: 'Solo se admite a través de HTTPS.',
      API_METHOD_NOT_FOUND: 'No se ha encontrado el método buscado.',
      API_REQUESTS_TOO_OFTEN: 'Se están enviando consultas demasiado seguidas.',
      API_INVALID_PARAMS: 'Se han enviado parámetros no válidos.',

      // SERVICES
      OTHER_SERVICE_INVALID_RESPONSE: 'Un servicio consultado ha enviado una respuesta inválida.',
      OTHER_SERVICE_ERROR: 'Ha ocurrido un error con el otro servicio consultado.',

      // MODELS ERRORS.
      SAMPLE_NAME_EXISTS: 'El nombre del ejemplo ya existe.',
      SAMPLE_NAME_BAD_LENGTH: 'El nombre del ejemplo no tiene un tamaño válido.',
      SAMPLE_NAME_NOT_VALID: 'El nombre del ejemplo no es válido.',
      SAMPLE_AGE_NOT_VALID: 'La edad del ejemplo no es válida.',
      SAMPLE_TEXT_NOT_VALID: 'El texto del ejemplo no es válido.',
      SAMPLE_OTHER_INFO_INVALID_KEY_OR_VALUE: 'La "otra información" del ejemplo no es válida.',
    },
  },
};

export default resources;
