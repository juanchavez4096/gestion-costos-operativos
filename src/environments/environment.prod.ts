const BASE_URL = 'http://192.168.1.4:';
const PORT = '8080';

export const environment = {
  production: true,
  BASE_URL: BASE_URL,

  GET_USERS: BASE_URL + PORT + '/api/usuario'
};
