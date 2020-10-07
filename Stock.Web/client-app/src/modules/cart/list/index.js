import { cloneDeep, pickBy } from "lodash";
import api from "../../../common/api";
import { apiErrorToast } from "../../../common/api/apiErrorToast";
import { normalize } from "../../../common/helpers/normalizer";
import { setProviders } from "../../providers/list";
import { setProductTypes } from "../../productType/list";
import { toast } from "react-toastify";
import { replace, push } from "connected-react-router";

const initialState = {
  loading: false,
  ids: [],
  byId: []
};

/* Action Types */
const LOADING = "CART_LOADING";
const SET = "CART_SET";
const CREATE = "CART_CREATE";
const UPDATE = "CART_UPDATE";
const REMOVE = "CART_REMOVE";

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

function handleSet(state, { products }) {
  return {
    ...state,
    ids: products.map(product => product.id),
    byId: normalize(products)
  };
}


function handleNewProduct(state, { cart }) {
  return {
    ...state,
    ids: cart.map(product => product.id),
    //ids: state.ids.concat([cart.id]),
    byId: cart
  };
}

function handleUpdateProduct(state, { product }) {
  return {
    ...state,
    byId: { ...state.byId, [product.id]: cloneDeep(product) }
  };
}

function handleRemoveProduct(state, { id }) {
  return {
    ...state,
    ids: state.ids.filter(productId => productId !== id),
    byId: Object.keys(state.byId).reduce(
      (acc, productId) =>
        productId !== `${id}`
          ? { ...acc, [productId]: state.byId[productId] }
          : acc,
      {}
    )
  };
}

const handlers = {
  [LOADING]: handleLoading,
  [SET]: handleSet,
  [CREATE]: handleNewProduct,
  [UPDATE]: handleUpdateProduct,
  [REMOVE]: handleRemoveProduct
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

export function setProducts(products) {
  return {
    type: SET,
    products
  };
}
//--------------------------------------------------------------------

export function success(cart) {
  return {
    type: ActionTypes.CREATE,
    cart
  };
}

function handleError(dispatch, error) {
  debugger;
  apiErrorToast(error);
}

// export function checkout(cart) {
//   console.log("entrando a guardar", cart)
//   return function (dispatch) {
//     dispatch(setLoading(true));
//     return api
//         .post(`/checkout`, cart).then((response) => {
//           if (!response.data.success) {
//             var error = { response: { data: { Message: response.data.message } } };
            
//             return handleError(dispatch, error);
//           }

//           dispatch(success(response.data.data));          
          
          
//           dispatch(setLoading(false));
         

//           toast.success("La compra se proceso");
           
//           return dispatch(push("/cart/view"));
//         })
//         .catch (error => {  
//           dispatch(setLoading(false));    
//           return handleError(dispatch, error);          
//         });
//     };    
//   }


export function checkout(cart) {
  console.log("entrando a guardar", cart)
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
      
      // response.data.data.array.forEach(element => {
      //   localStorage.removeItem(element.id);
      // });

      dispatch(setLoading(false));
      toast.success("La compra se proceso");
      return dispatch(replace("/cart/view"));
    }
    catch (error_1) {      
      return handleError(dispatch, error_1);
    }
  };
}












export function fetchAll() {
  return function (dispatch) {
    console.log(dispatch);
    dispatch(setLoading(true));
    return Promise.all([
      api.get("/product"),
      api.get("/producttype"),
      api.get("/provider")
    ])
      .then(([products, types, providers]) => {
        dispatch(setProducts(products.data));
        dispatch(setProductTypes(types.data));
        dispatch(setProviders(providers.data));
        dispatch(setLoading(false));
      })
      .catch(error => {
        apiErrorToast(error);
        return dispatch(setLoading(false));
      });
  };
}

export function fetchById(id) {
  return fetchAll({ id });
}

export function fetchByFilters(filters) {
  return function (dispatch) {
    return api
      .post("/product/search", pickBy(filters))
      .then(response => {
        const products = response.data.map(product => ({
          ...product,
          productTypeId: product.productType.id,
          productTypeDesc: product.productType.description
        }));
        dispatch(setProducts(products));
      })
      .catch(error => {
        apiErrorToast(error);
      });
  };
}

export function fetchAllTypes() {
  return function (dispatch) {
    dispatch(setLoading(true));
    return api
      .get("/producttype")
      .then(response => {
        dispatch(setProductTypes(response.data));
        return dispatch(setLoading(false));
      })
      .catch(error => {
        apiErrorToast(error);
        return dispatch(setLoading(false));
      });
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

