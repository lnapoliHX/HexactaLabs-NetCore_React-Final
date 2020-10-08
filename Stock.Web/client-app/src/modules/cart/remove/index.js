import api from "../../../common/api";
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

function handleError(dispatch, error) {
  apiErrorToast(error);
  
  return dispatch(setLoading(false));
}

export function remove(id) {
  return function(dispatch) {
    dispatch(setLoading(true));
    return api
      .delete(`/product/${id}`)
      .then((response) => {
        if (!response.data.success) {
          var error = {response: {data: {Message: response.data.message}}};

          return handleError(dispatch, error);
        }

        dispatch(success(id));
        dispatch(setLoading(false));
        toast.success("La compra se elimino con éxito");
        
        return dispatch(replace("/product"));
      })
      .catch(error => {
        return handleError(dispatch, error);
      });
  };
}
