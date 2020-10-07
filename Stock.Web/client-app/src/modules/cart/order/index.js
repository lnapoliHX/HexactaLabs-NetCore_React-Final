import api from "../../../common/api";
import { setLoading  } from "../list";
import { replace } from "connected-react-router";
import { toast } from "react-toastify";
import { last } from "lodash";

/* Actions */
export function order() {
  return function(dispatch) {
  dispatch(setLoading(true));
  let cartStored = localStorage.getItem('cart');
    if (cartStored !== null){
      cartStored = JSON.parse(cartStored);
      const keys = Object.keys(cartStored);
      keys.forEach(key => {
        api.get("product/stock/"+key).then(response =>{
          if (Number.parseInt(response.data.value) < Number.parseInt(cartStored[key])){
            delete cartStored[key];
          } else { 
            api.put(
              "product/stock/descontar/"+key+"?value="+cartStored[key]
            );
          }
          if (last(keys) === key){
            toast.success("Finalizó la compra con éxito");
            cartStored = JSON.stringify(cartStored)
            if (cartStored !== "{}")
              localStorage.setItem('cart', cartStored);
            else
              localStorage.removeItem('cart');
            localStorage.setItem('checkout', "ORDER");
            dispatch(setLoading(false));
            return dispatch(replace("/checkout"))
          }
        }).catch(() => {delete cartStored[key]});
      })   
    }    
  };
}