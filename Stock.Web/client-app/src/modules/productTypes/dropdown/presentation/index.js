import React from "react";
import PropTypes from "prop-types";
import { Field } from "redux-form";
import SelectField from "../../../../components/inputs/SelectField";

const Presentation = props => {
  const productTypesOptions = props.data.options;
  const defaultValue = props.data.defaultValue;
  
  //console.log('productTypesDropDown/presentation/productTypesOptions:', productTypesOptions);
  //console.log('productTypesDropDown/presentation/value:', value);
  //console.log('productTypesDropDown/presentation/props:', props);
  
  return (
    <Field
        label={props.label}
        name="productTypeDesc"
        component={SelectField}
        type="select"
        options={productTypesOptions}
        //value={value}
        defaultValue={defaultValue}
        onChangeFunction={props.onChangeFunction}
    />
  );
};

Presentation.propTypes = {
  data: PropTypes.object.isRequired,
  dataLoading: PropTypes.bool.isRequired,
  defaultPageSize: PropTypes.number,
  urls: PropTypes.shape({ create: PropTypes.string }),
  push: PropTypes.func.isRequired
};

export default Presentation;
