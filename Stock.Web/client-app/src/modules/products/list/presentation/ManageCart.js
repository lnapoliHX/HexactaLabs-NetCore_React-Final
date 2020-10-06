import React, { Component } from 'react';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';


class ManageCart extends Component {

  constructor(props) {
    super(props);
    this.state = {
        checkboxChecked: false,
        quantity: "",
        disabled: false,
        stock: 0 
    }
  }

  /*getStockById(){
    return api
      .get("/product/stock/"+this.props.value)
      .then(response => {
        return response.data.value;
      })
      .catch(() => {
        return 0;
      });
  }*/

  componentDidMount() {
    //TODOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
    //const stock = this.getStockById();
    let stock = 1;
    this.setState({stock: stock});
    if(stock === 0)
      this.setState({disabled : true});
    let cartStored = localStorage.getItem('cart');
    if (cartStored !== null){
      cartStored = JSON.parse(cartStored);
      if (cartStored[this.props.value] !== undefined)
        this.setState({
          checkboxChecked: true,
          quantity: cartStored[this.props.value]
        });
    }
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
  }

  removeProduct() {
    let cartStored = localStorage.getItem('cart');
    if (cartStored !== null){
      cartStored = JSON.parse(cartStored);
      delete cartStored[this.props.value];
      localStorage.setItem('cart', JSON.stringify(cartStored));  
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
    if (evt.target.value === ""){
      this.removeProduct();
      this.setState({checkboxChecked: false});
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
          onChange={(evt) => {  this.handleCheckBoxChange(evt)}} 
          onClick={() => {this.handleCheckBoxClick()}}
          disabled={this.state.disabled}
        />
    </InputGroupText>
    </InputGroupAddon>
    <Input 
      placeholder="Cantidad" type="text" 
      value={this.state.quantity} 
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
}

export default ManageCart;