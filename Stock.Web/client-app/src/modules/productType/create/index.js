import { toast } from "react-toastify";
import { setLoading, actionTypes } from "../list";
import api from "../../../common/api";
import { replace } from "connected-react-router";
import { apiErrorToast } from "../../../common/api/apiErrorToast";

const success = productType => ({
  type: actionTypes.CREATE,
  productType
});

function handleError(dispatch, error) {
  apiErrorToast(error);
  
  return dispatch(setLoading(false));
}

export function create(productType) {
  return function(dispatch) {
    dispatch(setLoading(true));
    return api
      .post(`/producttype/`, productType)
      .then(response => {
        if (!response.data.success) {
          var error = {response: {data: {Message: response.data.message}}};

          return handleError(dispatch, error);
        }

        dispatch(success(response.data.data));
        dispatch(setLoading(false));
        toast.success("El nuevo tipo se creó con exito");
        
        return dispatch(replace("/product-type"));
      })
      .catch(error => {
        return handleError(dispatch, error);
      });
  };
}
