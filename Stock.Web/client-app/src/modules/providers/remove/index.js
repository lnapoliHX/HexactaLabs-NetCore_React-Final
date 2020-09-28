import { replace } from "connected-react-router";
import { setLoading, ActionTypes } from "../list";
import api from "../../../common/api";
import { toast } from "react-toastify";
import { apiErrorToast } from "../../../common/api/apiErrorToast";

/* Actions */
function success(id) {
  return {
    type: ActionTypes.REMOVE,
    id
  };
}

<<<<<<< HEAD
=======
function handleError(dispatch, error) {
  apiErrorToast(error);
  
  return dispatch(setLoading(false));
}

>>>>>>> 6df99f5f4d613fd1494eaa06a4f06e9e68db8cb4
export function remove(id) {
  return function(dispatch) {
    dispatch(setLoading(true));
    return api
      .delete(`/provider/${id}`)
      .then(response => {
        if (!response.data.success) {
<<<<<<< HEAD
          toast.error(response.data.message);
          dispatch(setLoading(false));
          return dispatch(replace("/provider"));
        }

        toast.success("Se eliminó el proveedor con éxito");
        dispatch(success(id));
        dispatch(setLoading(false));
        return dispatch(replace("/provider"));
      })
      .catch(error => {
        apiErrorToast(error);
        return dispatch(setLoading(false));
=======
          var error = {response: {data: {Message: response.data.message}}};

          return handleError(dispatch, error);
        }

        dispatch(success(id));
        dispatch(setLoading(false));
        toast.success("Se eliminó el proveedor con éxito");
        
        return dispatch(replace("/provider"));
      })
      .catch(error => {
        return handleError(dispatch, error);
>>>>>>> 6df99f5f4d613fd1494eaa06a4f06e9e68db8cb4
      });
  };
}
