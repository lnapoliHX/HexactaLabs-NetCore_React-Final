import api from "../../../common/api";
import { apiErrorToast } from "../../../common/api/apiErrorToast";
import { setLoading, ActionTypes } from "../list";
import { toast } from "react-toastify";
import { goBack } from "connected-react-router";

/* Actions */
function success(product) {
  return {
    type: ActionTypes.SUMSTOCK,
    product,
  };
}

export function stock(product) {
  console.log(product);
  return function (dispatch) {
    dispatch(setLoading(true));
    return api
      .put(`/product/stock/sumar/${product.id}`, `${product.value}`)
      .then(() => {
        toast.success("El stock se actualizó con exito");
        dispatch(success(product));
        dispatch(setLoading(false));
        return dispatch(goBack());
      })
      .catch((error) => {
        apiErrorToast(error);
        return dispatch(setLoading(false));
      });
  };
}
