import { replace } from "connected-react-router";
import { toast } from "react-toastify";
import { setLoading, ActionTypes } from "../list";
import api from "../../../common/api";
import { apiErrorToast } from "../../../common/api/apiErrorToast";

<<<<<<< HEAD
const OK_STATUS = 200;

=======
>>>>>>> 6df99f5f4d613fd1494eaa06a4f06e9e68db8cb4
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
  return function (dispatch) {
    dispatch(setLoading(true));
    return api
      .delete(`/store/${id}`)
      .then(response => {
<<<<<<< HEAD
        if (response.status !== OK_STATUS) {
          toast.error(response.data.message);
          dispatch(setLoading(false));
          return dispatch(replace("/store"));
        }

        toast.success("Se eliminó la tienda con éxito");
        dispatch(success(id));
        dispatch(replace("/store"));
        return dispatch(setLoading(false));
      })
      .catch(error => {
        apiErrorToast(error);
        return dispatch(setLoading(false));
=======
        if (!response.data.success) {
          var error = {response: {data: {Message: response.data.message}}};

          return handleError(dispatch, error);
        }

        dispatch(success(id));
        dispatch(setLoading(false));
        toast.success("Se eliminó la tienda con éxito");
        
        return dispatch(replace("/store"));
      })
      .catch(error => {
        return handleError(dispatch, error);
>>>>>>> 6df99f5f4d613fd1494eaa06a4f06e9e68db8cb4
      });
  };
}
