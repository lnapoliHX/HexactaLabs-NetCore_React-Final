import { apiErrorToast } from "../../../common/api/apiErrorToast";
import { setLoading, ActionTypes } from "../list";
import { replace } from "connected-react-router";
import { toast } from "react-toastify";

/* Actions */
function success(id) {
  return {
    type: ActionTypes.REMOVE,
    id
  };
}

export function remove(id) {
  return function(dispatch) {
    dispatch(setLoading(true));
    let cartStored = localStorage.getItem('cart');
      if (cartStored !== null){
        cartStored = JSON.parse(cartStored);
        delete cartStored[id];
        dispatch(success(id));
        dispatch(setLoading(false));
        localStorage.setItem('cart', JSON.stringify(cartStored));
        toast.success("Se eliminó el producto con éxito");        
        return dispatch(replace("/cart"));
      } else  {
        apiErrorToast("Error");  
        return dispatch(setLoading(false));
      };
  };
}