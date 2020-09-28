import React from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import PropTypes from "prop-types";
import { getProductTypes, getAll } from "../../list/index";
import Presentation from "../presentation";

const initialState = {
  initials: "",
  description: "",
  condition: "AND"
};

class ProductTypesDropDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...initialState };
  }

  state = {
    productTypes: [],
    productTypeOptions: [],
    value: '',
  }
  
  componentDidMount() {
    if (this.props.productTypes.length > 0)
      this.props.initProductType(this.props.productTypes[0]['id'], this.props.productTypes[0].description);
    //console.log('***porductTypes.dropdown.container.productTypes:', this.props.productTypes);
    /*
    this.setState({
      productTypes: this.props.productTypes,
      value: this.props.productTypes[0].label,
      productTypeOptions: this.props.productTypes.map(pT => { 
                              return {'id': pT.id, 'label':  pT.description }
                            })
    });
    console.log('productTypes/dropdown/container');
    console.log(this.state.productTypes);
    console.log('productTypes/dropdown/container/productTypeOptions');
    console.log(this.state.productTypeOptions);
*/

  }
  
  onFilterChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onFilterReset = () => {
    this.setState({ ...initialState });
    this.props.getAll();
  };

  render() {
    const { productTypes, loading, ...rest } = this.props;
    const productTypeOptions = productTypes.map(pT => { 
            return {'id': pT.id, 'label':  pT.description, }
          });
    const defaultValue = this.props.defaultValue;
    const value = defaultValue;
    //console.log('porductTypes.dropdown.container.value:', value);
    
    
    return (
        <Presentation
          label={this.props.label}
          data={{'value': value, 'options': productTypeOptions}}
          defaultValue={defaultValue}
          dataLoading={loading}
          defaultPageSize={5}
          onChangeFunction={this.props.onChangeFunction}
          //defaultValue={this.props.onChangeFunction}
          {...rest}
        />
    );
  }
}

ProductTypesDropDown.propTypes = {
  productTypes: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  getAll: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  productTypes: getProductTypes(state)
});

const mapDispatchToProps = {
  getAll,
  push
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductTypesDropDown);
