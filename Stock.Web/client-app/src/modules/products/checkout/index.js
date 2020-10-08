import api from "../../../common/api";
import { goBack } from "connected-react-router";
import { apiErrorToast } from "../../../common/api/apiErrorToast";
import { setLoading, ActionTypes } from "../list";
import { toast } from "react-toastify";

/* Actions */
function success(order) {
  return {
    type: ActionTypes.CREATE,
    order
  };
}

export function create(order) {
  return function(dispatch) {
    dispatch(setLoading(true));
    console.log('creando orden: ', order);
    return api
      .post(`/order/`, order)
      .then(response => {
        if (response.data.success) {
          toast.success("La Orden se creó con éxito");
          dispatch(success(response.data.order));
          dispatch(setLoading(false));
          return dispatch(goBack());  
        } else {
          console.log('fail creating order***', response);
          toast.error("Error creando la Orden.");
          return dispatch(setLoading(false));  
        }
      })
      .catch(error => {
        console.log('error creating order***', error);
        apiErrorToast(error);
        return dispatch(setLoading(false));
      });
  };
}

