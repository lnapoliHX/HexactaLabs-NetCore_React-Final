import { replace } from "connected-react-router";
import { toast } from "react-toastify";

export function remove(id) {
  return function (dispatch) {
    localStorage.removeItem(id);
    if (!localStorage.getItem(id)) {
      toast.success("El producto se eliminó con éxito del carrito");
      return dispatch(replace("/carrito"));
    }
  };
}
