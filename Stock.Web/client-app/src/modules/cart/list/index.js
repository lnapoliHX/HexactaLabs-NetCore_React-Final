import { last } from "lodash";
import api from "../../../common/api";
import { apiErrorToast } from "../../../common/api/apiErrorToast";

const initialState = {
  loading: false,
  ids: [],
  byId: {}
};

/* Action Types */
const LOADING = "CART_LOADING";
const SET = "CART_SET";
const ORDER = "CART_ORDER";
const REMOVE = "CART_REMOVE";

export const ActionTypes = {
  LOADING,
  ORDER,
  REMOVE,
  SET
};

/* Reducer handlers */
function handleLoading(state, { loading }) {
  return {
    ...state,
    loading
  };
}

function handleOrder(state, { products }) {
  return {
    loading: false,
    ids: [],
    byId: {}
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

function handleSet(state, {products}) {
  return {
    ...state,
    ids: Object.keys(products),
    byId: products
  };
}

const handlers = {
  [LOADING]: handleLoading,
  [SET]: handleSet,
  [ORDER]: handleOrder,
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

function getStock(id, products){
  api.get("/product/stock/"+id).then(
    response => {
      products[id] = {
        ...products[id],
        stock: response.data.value
      };
    }).catch(error =>{
      apiErrorToast(error);
      products[id] = {
        ...products[id],
        stock: 0
      };
    });
}

export function fetchAll() {
    return function (dispatch) {
    //return dispatch => {
      dispatch(setLoading(true));
      let cartStored = localStorage.getItem('cart');
      if (cartStored !== null){
        cartStored = JSON.parse(cartStored);
        let keys = Object.keys(cartStored);         
        const getValues = new Promise ((resolve,reject) => {
          let toReturn = {};         
          keys.forEach(key =>{        
            Promise.all([
              api.get("/product/"+key),
              api.get("/product/precioVenta/"+key)
            ]).then(
              ([product,precioVenta]) => {
                toReturn[key] = { 
                  id: key,
                  name: product.data.name,
                  salePrice: precioVenta.data.value,
                  stock: cartStored[key]
                } 
                if(last(keys) === key){
                  resolve(toReturn);
                }
            });
          });
        });
        return getValues.then(value => { 
          console.log("value thennn");
          console.log(value);       
          dispatch(setProducts(value));
          console.log("entro hasta setloadin");
          dispatch(setLoading(false));
        }).catch(error=>{
          console.log("value value catchhh");
          console.log(error);   
          apiErrorToast(error)
          return dispatch(setLoading(false));
          console.log("entro hasta setloadincatchs");
        });
        
      }
  }
} 

/* Selectors */
function base(state) {
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
    console.log(cache);
    value = Object.values(getProductsById(state));
    return value;
  };
}

export const getCart = makeGetProductsMemoized();
/*const base = state => state.cart.list;
export const getLoading = state => base(state).loading;
export const getCart = state => base(state).byId;
export const getById = (state, id) =>
  getProductTypes(state).find(type => type.id === id);*/
