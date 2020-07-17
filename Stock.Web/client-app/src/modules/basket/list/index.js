import api from "../../../common/api";

const initialState = {
  loading: false,
  types: []
};

const LOADING = "BASKET_LOADING";
const SET = "BASKET_SET";
const CREATE = "BASKET_CREATE";
const REMOVE = "BASKET_REMOVE";
const UPDATE = "BASKET_UPDATE";

export const actionTypes = {
  LOADING,
  SET,
  CREATE,
  REMOVE,
  UPDATE
};

function handleLoading(state, { loading }) {
  return {
    ...state,
    loading
  };
}

function handleSet(state, { types }) {
  return { ...state, types: types.map(t => ({ ...t, id: `${t.id}` })) };
}

function handleNewBasket(state, { basket }) {
  if (!basket.id) {
    return state;
  }
  return { ...state, types: state.types.concat(basket) };
}

function handleRemove(state, { id }) {
  return {
    ...state,
    types: state.types.filter(type => type.id !== id)
  };
}

function handleUpdate(state, { basket }) {
  return {
    ...state,
    types: state.types.reduce(
      (acc, type) =>
        type.id === basket.id
          ? acc.concat([basket])
          : acc.concat(type),
      []
    )
  };
}

const handlers = {
  [LOADING]: handleLoading,
  [SET]: handleSet,
  [CREATE]: handleNewBasket,
  [REMOVE]: handleRemove,
  [UPDATE]: handleUpdate
};

export default function reducer(state = initialState, action) {
  const handler = handlers[action.type];
  return handler ? handler(state, action) : state;
}

export function setLoading(status) {
  return {
    type: LOADING,
    loading: status
  };
}

export function setBasket(types) {
  return {
    type: SET,
    types
  };
}

export function fetchAll() {
  return function (dispatch) {
    dispatch(setLoading(true));
    return api
      .get("/basket")
      .then(response => {
        dispatch(setBasket(response.data));
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
      .get(`/basket/${id}`)
      .then(response => {
        dispatch(setBasket(response.data));
        return dispatch(setLoading(false));
      })
      .catch(() => {
        return dispatch(setLoading(false));
      });
  };
}

// selectors
const base = state => state.basket.list;
export const getLoading = state => base(state).loading;
export const getBasket = state => base(state).types;
export const getById = (state, id) =>
  getBasket(state).find(type => type.id === id);
