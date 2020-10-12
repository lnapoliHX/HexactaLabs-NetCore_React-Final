const KEY = "Cart";

const list = () => JSON.parse(localStorage.getItem(KEY)) || [];

const save = (data) => {
	localStorage.setItem(KEY, JSON.stringify(data));
}

export const get = (id) => list().find((product) => product.id === id);

export const exists = (id) => !!get(id);

const update = (id, quantity) => save(list().map((product) => product.id === id ? ({ ...product, quantity }) : product));

export const localRemove = (id) => save(list().filter((product) => product.id !== id))

export const clear = () => {
	localStorage.removeItem(KEY)
}

export function setCart(id, quantity, stock) {
    if(exists(id)){
        var newQuantity = get(id).quantity + parseInt(quantity);
        if(newQuantity>stock){
            update(id, stock);
        }
        else{
            update(id, newQuantity);
        }
    }
    else{
        save(list().concat({
            id: id,
            quantity: parseInt(quantity)
        }))
    }
  }