import { toast } from "react-toastify";
import { setLoading, actionTypes } from "../list";
import api from "../../../common/api";
import { replace } from "connected-react-router";
import { apiErrorToast } from "../../../common/api/apiErrorToast";

const success = basket => ({
  type: actionTypes.CREATE,
  basket
});

function handleError(dispatch, error) {
  apiErrorToast(error);
  
  return dispatch(setLoading(false));
}

export function create(basket) {
  return function(dispatch) {
    dispatch(setLoading(true));
    return api
      .post(`/basket/`, basket)
      .then(response => {
        if (!response.data.success) {
          var error = {response: {data: {Message: response.data.message}}};

          return handleError(dispatch, error);
        }

        dispatch(success(response.data.data));
        dispatch(setLoading(false));
        toast.success("Se agrego con exito el producto al carrito");
        
        return dispatch(replace("/product"));
      })
      .catch(error => {
        return handleError(dispatch, error);
      });
  };
}
