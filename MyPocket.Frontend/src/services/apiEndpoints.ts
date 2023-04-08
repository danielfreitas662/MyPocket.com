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
    REMOVE: { endpoint: '/Category', method: Method.DELETE },
  },
  ACCOUNT: {
    GET: { endpoint: '/Account', method: Method.GET },
    GET_BY_ID: { endpoint: '/Account', method: Method.GET },
    ADD: { endpoint: '/Account', method: Method.POST },
    REMOVE: { endpoint: '/Account', method: Method.DELETE },
  },
  TRANSACTION: {
    GET: { endpoint: '/Transaction', method: Method.GET },
    FILTER: { endpoint: '/Transaction/Filter', method: Method.POST },
    GET_BY_ID: { endpoint: '/Transaction', method: Method.GET },
    ADD: { endpoint: '/Transaction', method: Method.POST },
    REMOVE: { endpoint: '/Transaction', method: Method.DELETE },
  },
  DASHBOARD: {
    AMOUNT_BY_CATEGORY: { endpoint: '/Transaction/AmountByCategoryByMonth', method: Method.GET },
    INCOME_BY_MONTH: { endpoint: '/Transaction/IncomeByMonth', method: Method.GET },
    OUTCOME_BY_MONTH: { endpoint: '/Transaction/OutcomeByMonth', method: Method.GET },
    TRANSACTIONS_BY_MONTH: { endpoint: '/Transaction/TransactionsByMonth', method: Method.GET },
    RESULTS_BY_MONTH: { endpoint: '/Transaction/ResultsByMonth', method: Method.GET },
  },
};
export default apiEndpoints;
