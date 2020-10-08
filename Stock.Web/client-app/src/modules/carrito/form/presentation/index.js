import React from "react";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form";
import { Form, Button } from "reactstrap";
import Validator from "../../../../common/helpers/YupValidator";
import SelectField from "../../../../components/inputs/SelectField";
import InputField from "../../../../components/inputs/InputField";
import schema from "../validation";

const ProductForm = (props) => {
  const { handleSubmit, handleCancel } = props;

  return (
    <Form onSubmit={handleSubmit}>
      <Field
        label="Cantidad"
        name="cantidad"
        component={InputField}
        type="number"
        parse={(v) => Number.parseInt(v)}
      />
      <Field
        name="producto"
        label="Producto"
        component={SelectField}
        type="select"
        options={props.getProductOptions}
      />

      <Button className="product-form__button" color="primary" type="submit">
        Agregar
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
  handleCancel: PropTypes.func.isRequired,
  getProductOptions: PropTypes.array.isRequired,
};

export default reduxForm({
  form: "product",
  validate: Validator(schema),
  enableReinitialize: true,
})(ProductForm);
