import React from "react";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form";
import { Form, Button } from "reactstrap";
import Validator from "../../../../common/helpers/YupValidator";
import CustomInputField from "../../../../components/inputs/CustomInputField.js";
import ProductTypeDropDownPage from "../../../productTypes/dropdown/page/index"
import schema from "../validation";

const ProductForm = props => {
  const { handleSubmit, handleCancel, handleChange, product, initProductType } = props;

  return (
    <Form onSubmit={handleSubmit}>
      <Field label="Nombre" name="name" component={CustomInputField} type="text"
            onChangeFunction={handleChange} defaultValue={product.name}/>
      <Field label="Costo" name="costPrice" component={CustomInputField} type="number" 
            onChangeFunction={handleChange} defaultValue={product.costPrice}/>
              {//pattern="^[0-9]\d*\.?\d*$"/>
              }
      <Field label="Precio de Venta" name="salePrice" component={CustomInputField} type="number" 
            onChangeFunction={handleChange} defaultValue={product.salePrice}/>
              {//pattern="^[0-9]\d*\.?\d*$"/>
              }
      <Field label="Stock" name="stock" component={CustomInputField} type="number" 
            onChangeFunction={handleChange} defaultValue={product.stock}/>
              {//pattern="^[0-9]\d*$"/>
              }
      <Field label="Categoría" name="productTypeDesc" component={ProductTypeDropDownPage} 
            //productTypeId={product.productType.id}
            onChangeFunction={handleChange} 
            defaultValue={product.productType.description}
            initProductType={initProductType}/>
      {/*
      <Field
        label="Id de Categoría"
        name="productTypeId"
        component={CustomInputField}
        type="text"
        defaultValue={product.productType.id}
      />
      
      <Field
        label="Categoría"
        name="productTypeDesc"
        component={SelectField}
        type="select"
        options={productTypesOptions}
      />
      */}
      {/*<ProductTypeDropDownPage  />
      */}
      {/*
      <ProductTypeDropDown
        label="Categoría"
        name="productTypeDesc"
        component={SelectField}
        type="select"
        options={productTypesOptions}
      />
      <Field
        label="Proveedores"
        name="providers"
        component={SelectField}
        type="select"
        multiple="multiple"
      />
      */}
      <Button className="product-form__button" color="primary" type="submit">
        Guardar
      </Button>
      <Button
        className="product-form__button"
        color="secondary"
        type="button"
        onClick={handleCancel}
      >
        Cancelar
      </Button>
    </Form>
  );
};

ProductForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired
};

export default reduxForm({
  form: "product",
  validate: Validator(schema),
  enableReinitialize: true
})(ProductForm);
/*
ProductForm = reduxForm({
  form: "product",
  validate: Validator(schema),
  enableReinitialize: true
})(ProductForm);

ProductForm = connect(product => {
  return product;
})(ProductForm)

export default ProductForm;
*/
