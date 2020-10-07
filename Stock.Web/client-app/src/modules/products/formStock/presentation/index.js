import React from "react";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form";
import { Form, Button } from "reactstrap";
import Validator from "../../../../common/helpers/YupValidator";
import InputField from "../../../../components/inputs/InputField";
import schema from "../validation";

const StockForm = (props) => {
  const { handleSubmit, handleCancel, initialValues } = props;

  return (
    <Form onSubmit={handleSubmit}>
      <h3>{initialValues.name}</h3>
      <Field
        label="Cantidad"
        name="value"
        component={InputField}
        type="number"
      />

      <Button className="product-form__button" color="primary" type="submit">
        Actualizar
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

StockForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  productTypeOptions: PropTypes.array.isRequired,
  providerOptions: PropTypes.array.isRequired,
};

export default reduxForm({
  form: "product",
  validate: Validator(schema),
  enableReinitialize: true,
})(StockForm);
