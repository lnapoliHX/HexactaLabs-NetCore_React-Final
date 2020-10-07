import api from "../../../common/api";

const initialState = {
  loading: false,
  types: [],
};

const LOADING = "COMPRAS_LOADING";
const SET = "COMPRAS_SET";
const CREATE = "COMPRAS_CREATE";
const REMOVE = "COMPRAS_REMOVE";
const UPDATE = "COMPRAS_UPDATE";

export const actionTypes = {
  LOADING,
  SET,
  CREATE,
  REMOVE,
  UPDATE,
};

function handleLoading(state, { loading }) {
  return {
    ...state,
    loading,
  };
}

function handleSet(state, { compras }) {
  return { ...state, compras: compras.map((t) => ({ ...t, id: `${t.id}` })) };
}

function handleNewCompra(state, { compra }) {
  if (!compra.id) {
    return state;
  }
  return { ...state, compras: state.compras.concat(compra) };
}

function handleRemove(state, { id }) {
  return {
    ...state,
    compras: state.compras.filter((compra) => compra.id !== id),
  };
}

function handleUpdate(state, { compra }) {
  return {
    ...state,
    compras: state.compras.reduce(
      (acc, compra) =>
        compra.id === compra.id ? acc.concat([compra]) : acc.concat(compra),
      []
    ),
  };
}

const handlers = {
  [LOADING]: handleLoading,
  [SET]: handleSet,
  [CREATE]: handleNewCompra,
  [REMOVE]: handleRemove,
  [UPDATE]: handleUpdate,
};

export default function reducer(state = initialState, action) {
  const handler = handlers[action.type];
  return handler ? handler(state, action) : state;
}

export function setLoading(status) {
  return {
    type: LOADING,
    loading: status,
  };
}

export function setCompras(compras) {
  return {
    type: SET,
    compras,
  };
}

export function fetchAll() {
  return function (dispatch) {
    dispatch(setLoading(true));
    return api
      .get("/compra")
      .then((response) => {
        dispatch(setCompras(response.data));
        return dispatch(setLoading(false));
      })
      .catch(() => {
        return dispatch(setLoading(false));
      });
  };
}

export function fetchById(id) {
  return function (dispatch) {
    dispatch(setLoading(true));
    return api
      .get(`/compra/${id}`)
      .then((response) => {
        dispatch(setCompras(response.data));
        return dispatch(setLoading(false));
      })
      .catch(() => {
        return dispatch(setLoading(false));
      });
  };
}

// selectors
const base = (state) => state.compras.list;
export const getLoading = (state) => base(state).loading;
export const getCompras = (state) => base(state).compras;
export const getById = (state, id) =>
  getCompras(state).find((compra) => compra.id === id);
