//import { pickBy } from "lodash";
//import api from "../../../common/api";
//import { apiErrorToast } from "../../../common/api/apiErrorToast";

const initialState = {
    orderedItems: {},
};

/* Action types */

const ADD = 'ADD_ITEM';
const RESET = 'RESET_CART';

export const ActionTypes = {
  ADD,
  RESET,
};

/* Reducer handlers */
function handleAddItemToCart(state, { item }) {
  return {
    ...state,
    orderedItems: {
        ...state.orderedItems,
        [item.id]: item.quantity
    }
  };
}

function handleResetCart(state) {
    console.log('Se ejecuto handleResetCart');
  return {
    ...state,
    orderedItems: {'a': 1},
  };
}

const handlers = {
  [ADD]: handleAddItemToCart,
  [RESET]: handleResetCart,
};

export default function reducer(state = initialState, action) {
  const handler = handlers[action.type];
  return handler ? handler(state, action) : state;
}

export function getOrderedItems(state) {
    console.log('Se ejecuto getOrderedItems');
  return state.orderedItems;
}

export function addItemToCart(item) {
    return {
      type: ADD,
      item
    };
  }

export function resetCart() {
    console.log('Se ejecuto resetCart');
    return {
        type: RESET,
        
    }
}