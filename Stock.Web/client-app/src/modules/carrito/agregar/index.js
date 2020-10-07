import { toast } from "react-toastify";
import { replace } from "connected-react-router";

export function agregar(product) {
  return function (dispatch) {
    // if (product.producto.stock > product.cantidad) {
    localStorage.setItem(product.producto, product.cantidad);
    if (localStorage.getItem(product.producto)) {
      toast.success("El producto se agregó con éxito al carrito");
      return dispatch(replace("/carrito"));
    }
    /*} else {
      toast.success("El producto No se agregó al carrito, falta stock");
      return dispatch(replace("/carrito"));
    }*/
  };
}
