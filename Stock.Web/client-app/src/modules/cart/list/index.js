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

export function getStockById(id){
  return api.get("/product/stock/"+id).then(
    response => {
      return response.data.value    
    }).catch(error =>{
      return 0;
    });
}

export function fetchAll() {
    return function (dispatch) {    
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
          dispatch(setProducts(value));
          dispatch(setLoading(false));
          checkoutVerify(value);
        }).catch(error=>{  
          apiErrorToast(error)
          dispatch(setProducts("{}"));
          return dispatch(setLoading(false));
        });       
      } else {
        dispatch(setProducts([]));
        dispatch(setLoading(false));
      }
  }
} 
function checkoutVerify(value){
  if(localStorage.getItem('checkout') === "ORDER"){
    localStorage.removeItem('cart');
    localStorage.setItem('checkout', "false");
    api.post("/order/",{id:""}).then(orderCreated => {
      const id = orderCreated.data.data.id;
      const keys = Object.keys(value);
      keys.forEach(key => {
          api.post("/order/addProduct/"+id+"?productId="+value[key]["id"]+"&quantity="+value[key]["stock"])
      });
    });
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
