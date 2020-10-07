import api from "../../../common/api";
import { normalize } from "../../../common/helpers/normalizer";

const initialState = {
  loading: false,
  ids: [],
  byId: {}
};

/* Action Types */
const LOADING = "SHOPPING_LOADING";
const SET = "SHOPPING_SET";

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

function handleSet(state, { shoppings }) {
  return {
    ...state,
    ids: shoppings.map(shopping => shopping.id),
    byId: normalize(shoppings)
  };
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

export function setShoppings(shoppings) {
  return {
    type: SET,
    shoppings
  };
}

export function fetchAll() {
    return function (dispatch) {
      dispatch(setLoading(true));
      return api
        .get("/shopping")
        .then(response => {
          dispatch(setShoppings(response.data));
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
        .get(`/shopping/${id}`)
        .then(response => {
          dispatch(setShoppings(response.data));
          return dispatch(setLoading(false));
        })
        .catch(() => {
          return dispatch(setLoading(false));
        });
    };
  }

/* Selectors */
function base(state) {
    return state.shopping.list;
  }
  
  export function getLoading(state) {
    return base(state).loading;
  }

  export function getShoppingsById(state) {
    return base(state).byId;
  }

  export function getShoppingById(state, id) {
    return getShoppingsById(state)[id] || {};
  }

  export function makeGetShoppingsMemoized() {
    let cache;
    let value = [];
    return state => {
      if (cache === getShoppingsById(state)) {
        return value;
      }
      cache = getShoppingsById(state);
      value = Object.values(getShoppingsById(state));
      return value;
    };
  }
  
  export const getShoppings = makeGetShoppingsMemoized();

