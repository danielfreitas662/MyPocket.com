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
    CHANGE_PASSWORD: { endpoint: '/User', method: Method.PATCH },
  },
  CATEGORY: {
    GET: { endpoint: '/Category', method: Method.GET },
    GET_BY_ID: { endpoint: '/Category', method: Method.GET },
    FILTER: { endpoint: '/Category/Filter', method: Method.POST },
    ADD: { endpoint: '/Category', method: Method.POST },
    REMOVE: { endpoint: '/Category', method: Method.DELETE },
  },
  BUDGET: {
    GET: { endpoint: '/Budget', method: Method.GET },
    GET_BY_ID: { endpoint: '/Budget', method: Method.GET },
    GET_BY_MONTH: { endpoint: '/Budget/Month', method: Method.GET },
    FILTER: { endpoint: '/Budget/Filter', method: Method.POST },
    ADD: { endpoint: '/Budget', method: Method.POST },
    REMOVE: { endpoint: '/Budget', method: Method.DELETE },
    GET_ITEMS: { endpoint: '/Budget/GetItems', method: Method.GET },
    ADD_ITEM: { endpoint: '/Budget/AddItem', method: Method.POST },
    UPDATE_ITEM: { endpoint: '/Budget/UpdateItem', method: Method.PATCH },
    REMOVE_ITEM: { endpoint: '/Budget/RemoveItem', method: Method.DELETE },
  },
  ACCOUNT: {
    GET: { endpoint: '/Account', method: Method.GET },
    GET_BY_ID: { endpoint: '/Account', method: Method.GET },
    FILTER: { endpoint: '/Account/Filter', method: Method.POST },
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
    EXPENSES_BY_MONTH: { endpoint: '/Transaction/ExpensesByMonth', method: Method.GET },
    TRANSACTIONS_BY_MONTH: { endpoint: '/Transaction/TransactionsByMonth', method: Method.GET },
    RESULTS_BY_MONTH: { endpoint: '/Transaction/ResultsByMonth', method: Method.GET },
    CATEGORY_EXPENSES: { endpoint: '/Category/CategoriesExpenses', method: Method.GET },
  },
};
export default apiEndpoints;
