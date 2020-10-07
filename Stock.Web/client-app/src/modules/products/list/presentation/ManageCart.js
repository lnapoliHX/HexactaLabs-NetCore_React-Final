import React, { Component } from 'react';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import { toast } from "react-toastify";
import {getStockById} from "../../../cart/list/index.js"

class ManageCart extends Component {

  constructor(props) {
    super(props);
    this.state = {
        checkboxChecked: false,
        quantity: "",
        disabled: true,
        stock: 0 
    }
  }

  render(){
    let setProductOnCartInput = (
    <InputGroup >
    <InputGroupAddon addonType="prepend">
    <InputGroupText>
        <Input 
          addon type="checkbox" aria-label="checkboxCart" 
          checked={this.state.checkboxChecked} 
          onChange={(evt) => {this.handleCheckBoxChange(evt)}} 
          onClick={() => {this.handleCheckBoxClick()}}
          disabled={this.state.disabled}
        />
    </InputGroupText>
    </InputGroupAddon>
    <Input 
      placeholder="Cantidad"
      value={this.state.quantity} 
      type="number"
      onChange={(evt) => {this.handleInputChange(evt)}}
      disabled={this.state.disabled}
    />
    </InputGroup>
    );

    return (
        <span>
        {setProductOnCartInput}
        </span>
    );
  }

  componentDidMount() {
    getStockById(this.props.value).then(value =>{
      this.setState({stock: value});
      if(value !== 0)
        this.setState({disabled : false});
      let cartStored = localStorage.getItem('cart');
      if (cartStored !== null){
        cartStored = JSON.parse(cartStored);
        if (cartStored[this.props.value] !== undefined)
          this.setState({
            checkboxChecked: true,
            quantity: cartStored[this.props.value]
          });
      }
    })        
  }

  setProductQuantity (quantity = this.state.quantity) {
    let cartStored = localStorage.getItem('cart');
    if (cartStored !== null)
      cartStored = JSON.parse(cartStored);
    else 
      cartStored = {}
    let toStore = {
      ...cartStored,
      [this.props.value]: quantity
    }
    localStorage.setItem('cart', JSON.stringify(toStore));  
    toast.success("Se establecieron "+ quantity + " unidades del producto en el carrito");   
  }

  removeProduct() {
    let cartStored = localStorage.getItem('cart');
    if (cartStored !== null){
      cartStored = JSON.parse(cartStored);
      delete cartStored[this.props.value];
      cartStored = JSON.stringify(cartStored);
      if (cartStored !== "{}")
        localStorage.setItem('cart', cartStored); 
      else  
        localStorage.removeItem('cart');
      toast.success("Se elimino el producto del carrito");    
    }      
  }

  handleCheckBoxClick () {    
    if (!this.state.checkboxChecked && this.state.quantity !== "" && Number.parseInt(this.state.quantity) > 0)
      this.setProductQuantity();
    else{
      this.setState({checkboxChecked: false});
      if (this.state.checkboxChecked && this.state.quantity !== "")
        this.removeProduct();
    }  
  }

  handleCheckBoxChange (evt) {    
    if(this.state.quantity !== "" && Number.parseInt(this.state.quantity) > 0){
      this.setState({checkboxChecked: evt.target.checked})            
    }   
  }

  handleInputChange (evt){
    this.setState({quantity: evt.target.value});
    if (this.state.checkboxChecked)
      this.setProductQuantity(evt.target.value);
    if (evt.target.value === "" && this.state.checkboxChecked){
      this.removeProduct();
      this.setState({checkboxChecked: false});
    }      
  }
}

export default ManageCart;