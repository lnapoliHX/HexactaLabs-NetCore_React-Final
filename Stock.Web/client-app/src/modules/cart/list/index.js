import api from "../../../common/api";
import { apiErrorToast } from "../../../common/api/apiErrorToast";
import { normalize } from "../../../common/helpers/normalizer";
import { exists, get, clear } from "../../localstorage";
import { replace } from "connected-react-router";
import { toast } from "react-toastify";

const initialState = {
  loading: false,
  ids: [],
  byId: {}
};

/* Action Types */
const LOADING = "CARTS_LOADING";
const SET = "CARTS_SET";

export const ActionTypes = {
  LOADING,
  SET
};

/* Reducer handlers */
function handleLoading(state, { loading }) {
  return {
    ...state,
    loading
  };
}

function handleSet(state, { carts }) {
  return {
    ...state,
    ids: carts.map(cart => cart.id),
    byId: normalize(carts)
  };
}

function handleError(dispatch, error) {
  apiErrorToast(error);
  
  return dispatch(setLoading(false));
}

const handlers = {
  [LOADING]: handleLoading,
  [SET]: handleSet,
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

export function setcarts(carts) {
  return {
    type: SET,
    carts
  };
}

export function fetchLocal() {
  return function (dispatch) {
    dispatch(setLoading(true));
     return api
      .get("/product")
        .then(response => {
          const carts = response.data.filter(function(cart){
            if(exists(cart.id)){
              cart.quantity = get(cart.id).quantity;
              return cart;
            }
          });
          dispatch(setcarts(carts));
          dispatch(setLoading(false));
        })
        .catch(error => {
          apiErrorToast(error);
          return dispatch(setLoading(false));
        });
  };
}

export function checkoutProducts(products) {
  return function(dispatch) {
    const product = {
      products: products
    }  
    dispatch(setLoading(true));
    return api
      .post(`/shopping/`, product)
      .then(response => {
        if (!response.data.success) {
          var error = {response: {data: {Message: response.data.message}}};
          clear();
          dispatch(setcarts([]));
          return handleError(dispatch, error);
        }

        dispatch(setLoading(false));
        toast.success("Compra finalizada");
        
        clear();
        return dispatch(replace(`/shopping/view/${response.data.data.id}`));
      })
      .catch(error => {
        clear();
        dispatch(setcarts([]));
        return handleError(dispatch, error);
      });
  };
}

export function totalPrice(products) {
  var totalPrice = 0;
  products.map(product => {
    var productPrice = product.quantity * product.salePrice;
    totalPrice = totalPrice + productPrice;
  });
  return totalPrice;
}

/* Selectors */
function base(state) {
    return state.cart.list;
  }
  
  export function getLoading(state) {
    return base(state).loading;
  }

  export function getcartsById(state) {
    return base(state).byId;
  }

  export function makeGetcartsMemoized() {
    let cache;
    let value = [];
    return state => {
      if (cache === getcartsById(state)) {
        return value;
      }
      cache = getcartsById(state);
      value = Object.values(getcartsById(state));
      return value;
    };
  }
  
  export const getcarts = makeGetcartsMemoized();

