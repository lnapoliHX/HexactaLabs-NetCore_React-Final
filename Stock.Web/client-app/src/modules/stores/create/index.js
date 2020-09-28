import api from "../../../common/api";
<<<<<<< HEAD
import { goBack } from "connected-react-router";
import { apiErrorToast } from "../../../common/api/apiErrorToast";
import { setLoading, ActionTypes } from "../list";
import { toast } from "react-toastify";
=======
import { apiErrorToast } from "../../../common/api/apiErrorToast";
import { setLoading, ActionTypes } from "../list";
import { toast } from "react-toastify";
import { replace } from "connected-react-router";
>>>>>>> 6df99f5f4d613fd1494eaa06a4f06e9e68db8cb4

/* Actions */
function success(store) {
  return {
    type: ActionTypes.CREATE,
    store
  };
}

<<<<<<< HEAD
=======
function handleError(dispatch, error) {
  apiErrorToast(error);
  
  return dispatch(setLoading(false));
}

>>>>>>> 6df99f5f4d613fd1494eaa06a4f06e9e68db8cb4
export function create(store) {
  return function(dispatch) {
    dispatch(setLoading(true));
    return api
      .post(`/store/`, store)
      .then(response => {
<<<<<<< HEAD
        if (response.data.success) {
          toast.success("La tienda se creó con éxito");
          dispatch(success(response.data.store));
          dispatch(setLoading(false));
          return dispatch(goBack());  
        } else {
          //apiErrorToast(error);
          toast.error("La tienda ya existe.");
          return dispatch(setLoading(false));  
        }
      })
      .catch(error => {
        apiErrorToast(error);
        return dispatch(setLoading(false));
=======
        if (!response.data.success) {
          var error = {response: {data: {Message: response.data.message}}};

          return handleError(dispatch, error);
        }

        dispatch(success(response.data.data));
        dispatch(setLoading(false));
        toast.success("La tienda se creó con éxito");
        
        return dispatch(replace("/store"));
      })
      .catch(error => {
        return handleError(dispatch, error);
>>>>>>> 6df99f5f4d613fd1494eaa06a4f06e9e68db8cb4
      });
  };
}
