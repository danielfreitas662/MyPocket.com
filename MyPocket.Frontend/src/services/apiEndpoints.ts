enum Method {
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
  PUT = 'PUT',
}
interface EndPoint {
  endpoint: string;
  method: Method;
}
interface APIEndpoint {
  [key: string]: {
    [key: string]: EndPoint;
  };
}
const apiEndpoints: APIEndpoint = {
  USER: {
    GET_USER: { endpoint: '/User/GetUser', method: Method.GET },
    AUTHENTICATE: { endpoint: '/User/Authenticate', method: Method.POST },
    SIGNUP: { endpoint: '/User', method: Method.POST },
  },
  CATEGORY: {
    GET: { endpoint: '/Category', method: Method.GET },
    GET_BY_ID: { endpoint: '/Category', method: Method.GET },
    ADD: { endpoint: '/Category', method: Method.POST },
  },
};
export default apiEndpoints;
