const KEY = "Cart";

const list = () => JSON.parse(localStorage.getItem(KEY)) || [];

const save = (data) => {
	localStorage.setItem(KEY, JSON.stringify(data));
}

export const get = (id) => list().find((product) => product.id === id);

export const exists = (id) => !!get(id);

const update = (id, cant) => save(list().map((product) => product.id === id ? ({ ...product, cant }) : product));

export const localRemove = (id) => save(list().filter((product) => product.id !== id))

export const clear = () => {
	localStorage.removeItem(KEY)
}

export function setCart(id, cant, stock) {
    if(exists(id)){
        var newCant = get(id).cant + parseInt(cant);
        if(newCant>stock){
            update(id, stock);
        }
        else{
            update(id, newCant);
        }
    }
    else{
        save(list().concat({
            id: id,
            cant: parseInt(cant)
        }))
    }
  }