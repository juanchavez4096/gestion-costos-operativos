const BASE_URL = 'http://192.168.1.4:';
const PORT = '8080';

export const environment = {
  production: false,
  BASE_URL: BASE_URL,


  GET_USERS: BASE_URL + PORT + '/api/usuario',
  GET_PRODUCTS: BASE_URL + PORT + '/api/productos',
  GET_MATERIALS: BASE_URL + PORT + '/api/materiales'
};

