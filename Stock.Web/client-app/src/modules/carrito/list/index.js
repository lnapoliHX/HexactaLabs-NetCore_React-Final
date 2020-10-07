import { cloneDeep, pickBy } from "lodash";
import api from "../../../common/api";
import { apiErrorToast } from "../../../common/api/apiErrorToast";
import { normalize } from "../../../common/helpers/normalizer";
import { setProviders } from "../../providers/list";
import { setProductTypes } from "../../productType/list";
import { setCompras } from "../../compras/list";
import { replace } from "connected-react-router";
import { toast } from "react-toastify";

const initialState = {
  loading: false,
  ids: [],
  byId: {},
};

/* Action Types */
const LOADING = "PRODUCTS_LOADING";
const SET = "PRODUCTS_SET";
const CREATE = "PRODUCTS_CREATE";
const UPDATE = "PRODUCTS_UPDATE";
const SUMSTOCK = "PRODUCTS_SUMARSTOCK";
const RESTSTOCK = "PRODUCTS_RESTARSTOCK";
const REMOVE = "PRODUCTS_REMOVE";

export const ActionTypes = {
  LOADING,
  SET,
  CREATE,
  UPDATE,
  SUMSTOCK,
  RESTSTOCK,
  REMOVE,
};

/* Reducer handlers */
function handleLoading(state, { loading }) {
  return {
    ...state,
    loading,
  };
}

function handleSet(state, { products }) {
  return {
    ...state,
    ids: products.map((product) => product.id),
    byId: normalize(products),
  };
}

function handleNewProduct(state, { product }) {
  return {
    ...state,
    ids: state.ids.concat([product.id]),
    byId: {
      ...state.byId,
      [product.id]: cloneDeep(product),
    },
  };
}

function handleUpdateProduct(state, { product }) {
  return {
    ...state,
    byId: { ...state.byId, [product.id]: cloneDeep(product) },
  };
}

function handleRestStockProduct(state, { product }) {
  return {
    ...state,
    byId: { ...state.byId, [product.id]: cloneDeep(product) },
  };
}
function handleSumStockProduct(state, { product }) {
  return {
    ...state,
    stock: normalize(product),
  };
}

function handleRemoveProduct(state, { id }) {
  return {
    ...state,
    ids: state.ids.filter((productId) => productId !== id),
    byId: Object.keys(state.byId).reduce(
      (acc, productId) =>
        productId !== `${id}`
          ? { ...acc, [productId]: state.byId[productId] }
          : acc,
      {}
    ),
  };
}

const handlers = {
  [LOADING]: handleLoading,
  [SET]: handleSet,
  [CREATE]: handleNewProduct,
  [UPDATE]: handleUpdateProduct,
  [SUMSTOCK]: handleSumStockProduct,
  [RESTSTOCK]: handleRestStockProduct,
  [REMOVE]: handleRemoveProduct,
};

export default function reducer(state = initialState, action) {
  const handler = handlers[action.type];
  return handler ? handler(state, action) : state;
}

/* Actions */
export function setLoading(status) {
  return {
    type: LOADING,
    loading: status,
  };
}

export function setProducts(products) {
  return {
    type: SET,
    products,
  };
}

export function fetchAll() {
  return function (dispatch) {
    dispatch(setLoading(true));
    return Promise.all([
      api.get("/product"),
      api.get("/producttype"),
      api.get("/provider"),
      api.get("/compra"),
    ])
      .then(([products, types, providers, compras]) => {
        dispatch(setProducts(products.data));
        dispatch(setProductTypes(types.data));
        dispatch(setProviders(providers.data));
        dispatch(setCompras(compras.data));
        dispatch(setLoading(false));
      })
      .catch((error) => {
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
      .then((response) => {
        const products = response.data.map((product) => ({
          ...product,
          productTypeId: product.productType.id,
          productTypeDesc: product.productType.description,
        }));
        dispatch(setProducts(products));
      })
      .catch((error) => {
        apiErrorToast(error);
      });
  };
}

export function fetchAllTypes() {
  return function (dispatch) {
    dispatch(setLoading(true));
    return api
      .get("/producttype")
      .then((response) => {
        dispatch(setProductTypes(response.data));
        return dispatch(setLoading(false));
      })
      .catch((error) => {
        apiErrorToast(error);
        return dispatch(setLoading(false));
      });
  };
}

function verificarStock(detalles, total) {
  let nuevoDetalles = [];
  let nuevoTotal = 0;

  for (let det of detalles) {
    let cantidad = parseInt(det.Cantidad); // cantidad pedida

    if (det.stock >= cantidad) {
      nuevoDetalles.push(det);
      nuevoTotal = nuevoTotal + cantidad * det.salePrice;
    }
  }

  return { TotalPrice: nuevoTotal, detalles: nuevoDetalles };
}

export function pagarCuenta(detalles, total) {
  let compraV = verificarStock(detalles, total);

  if (compraV.detalles.length > 0) {
    let compra = {
      Fecha: new Date(),
      TotalPrice: compraV.TotalPrice,
      detalles: compraV.detalles,
    };

    return function (dispatch) {
      dispatch(setLoading(true));
      return api
        .post(`/compra`, compra)
        .then((response) => {
          console.log(compra);
          if (response.data.success === true) {
            for (let det of compra.detalles) {
              localStorage.removeItem(det.id);
            }
            dispatch(setLoading(false));
            return dispatch(replace("/compras"));
          }
          var error = {
            response: { data: { Message: response.data.message } },
          };
          return error;
        })
        .catch((error) => {
          apiErrorToast(error);
        });
    };
  } else {
    var error = {
      response: {
        data: {
          Message:
            "El stock de ningun producto alcanza para realizar la compra",
        },
      },
    };
    console.log(error);

    return function (dispatch) {
      toast.error(
        "El stock de ningun producto alcanza para realizar la compra"
      );
      return dispatch(replace("/carrito"));
    };
  }
}

/* Selectors */
function base(state) {
  return state.product.list;
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
  return (state) => {
    if (cache === getProductsById(state)) {
      return value;
    }
    cache = getProductsById(state);
    value = Object.values(getProductsById(state));
    return value;
  };
}

export const getProducts = makeGetProductsMemoized();
