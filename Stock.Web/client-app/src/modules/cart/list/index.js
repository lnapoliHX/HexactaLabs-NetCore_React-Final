import api from "../../../common/api";
import { apiErrorToast } from "../../../common/api/apiErrorToast";
import { toast } from "react-toastify";
import { replace } from "connected-react-router";

const initialState = {
  loading: false,
  ids: [],
  byId: []
};

/* Action Types */
const LOADING = "CART_LOADING";
const CREATE = "CART_CREATE";


export const ActionTypes = {
  LOADING,
  CREATE
};

/* Reducer handlers */
function handleLoading(state, { loading }) {
  return {
    ...state,
    loading
  };
}

function handleNewCart(state, { cart }) {
  return {
    ...state,
    ids: cart.map(product => product.id),
    byId: cart
  };
}


const handlers = {
  [LOADING]: handleLoading, 
  [CREATE]: handleNewCart 
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

export function success(cart) {
  return {
    type: CREATE,
    cart
  };
}

function handleError(dispatch, error) {
  apiErrorToast(error);
}

export function checkout(cart) {

  return async function (dispatch) {
    dispatch(setLoading(true));
    try {
      const response = await api
        .post(`/checkout`, cart);    
      if (!response.data.success) {
        var error = { response: { data: { Message: response.data.message } } };
        return handleError(dispatch, error);
      }
      dispatch(success(response.data.data));      
       response.data.data.forEach(element => {
         localStorage.removeItem(element.id);
       });
      dispatch(setLoading(false));
      toast.success("La compra se proceso");
      return dispatch(replace("/cart/view"));
    }
    catch (error_1) {      
      return handleError(dispatch, error_1);
    }
  };
}

/* Selectors */
function base(state) {
  return state.product.list;
}

export function baseCart(state) {
  return state.cart.list;
}


export function getLoading(state) {
  return base(state).loading;
}

export function getProductsById(state) {
  return base(state).byId;
}

export function getProductById(state, id) {
  return getProductsById(state)[id] || {};
}

export function getProductIds(state) {
  return base(state).ids;
}

export function makeGetProductsMemoized() {
  let cache;
  let value = [];
  return state => {
    if (cache === getProductsById(state)) {
      return value;
    }
    cache = getProductsById(state);
    value = Object.values(getProductsById(state));
    return value;
  };
}

export const getProducts = makeGetProductsMemoized();

