const BASE_URL = 'http://localhost:';
const PORT = '8081';

export const environment = {
  production: false,
  BASE_URL: BASE_URL,


  GET_USERS: BASE_URL + PORT + '/api/usuario',
  GET_PRODUCTS: BASE_URL + PORT + '/api/productos',
  GET_MATERIALS: BASE_URL + PORT + '/api/materiales',
  GET_PRODUCTOMATERIAL: BASE_URL + PORT + '/api/productoMaterial',
  GET_EMPRESA: BASE_URL + PORT + '/api/empresa'
  
};

