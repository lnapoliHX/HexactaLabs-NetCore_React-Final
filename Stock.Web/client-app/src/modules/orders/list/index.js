import { pickBy } from "lodash";
import api from "../../../common/api";
import { apiErrorToast } from "../../../common/api/apiErrorToast";

const initialState = {
  loading: false,
  orders: [],
};

/* Action types */

const LOADING = "ORDERS_LOADING";
const SET = "ORDERS_SET";
const CREATE = "ORDERS_CREATE";
const UPDATE = "ORDERS_UPDATE";
const REMOVE = "ORDERS_REMOVE";

export const ActionTypes = {
  LOADING,
  SET,
  CREATE,
  UPDATE,
  REMOVE
};

/* Reducer handlers */
function handleLoading(state, { loading }) {
  return {
    ...state,
    loading
  };
}

function handleSet(state, { orders }) {
  return {
    ...state,
    orders,
  };
}

function handleNewOrder(state, { order }) {
  return {
    ...state,
    orders: state.orders.concat(order)
  };
}

function handleUpdateOrder(state, { order }) {
  return {
    ...state,
    orders: state.orders.map(o => (o.id === order.id ? order : o))
  };
}

function handleRemoveOrder(state, { id }) {
  return {
    ...state,
    orders: state.orders.filter(o => o.id !== id)
  };
}

const handlers = {
  [LOADING]: handleLoading,
  [SET]: handleSet,
  [CREATE]: handleNewOrder,
  [UPDATE]: handleUpdateOrder,
  [REMOVE]: handleRemoveOrder
};

export default function reducer(state = initialState, action) {
  const handler = handlers[action.type];
  return handler ? handler(state, action) : state;
}

/* Actions */
export function setLoading(status) {
  return {
    type: LOADING,
    loading: status
  };
}

export function setOrders(orders) {
  return {
    type: SET,
    orders: orders.map(order => {
        let orderTotal = 0;
        const items = order.items.map(item => {
          const itemTotal = item.salePrice * item.quantity;
          orderTotal += itemTotal;
          return {
            ...item,
            total: itemTotal
          }
        });
        return {
          ...order,
          items: items,
          total: orderTotal
        }
      })
  };
}

export function getAll() {
  return dispatch => {
    dispatch(setLoading(true));
    return api
      .get("/order")
      .then(responseOrders => {
          dispatch(setOrders(responseOrders.data.orders));
          return dispatch(setLoading(false));
        })
      .catch(error => {
        apiErrorToast(error);
        return dispatch(setLoading(false));
      });
  };
}

export function getById(id) {
  return getAll({ id });
}

export function fetchByFilters(filters) {
  return function(dispatch) {
    return api
      .post("/order/search", pickBy(filters))
      .then(response => {
        dispatch(setOrders(response.data.orders));
      })
      .catch(error => {
        apiErrorToast(error);
      });
  };
}

/* Selectors */
function base(state) {
  return state.order.list;
}

export function getLoading(state) {
  return base(state).loading;
}

export function getOrders(state) {
  return base(state).orders;
}

export function getOrderById(state, id) {
  return getOrders(state).find(o => o.id === id);
}
