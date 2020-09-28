import React from "react";
import PropTypes from "prop-types";
import { Label, Input, FormFeedback, FormGroup } from "reactstrap";

const CustomInputField = props => {
  const {
    input,
    label,
    placeholder,
    type,
    onChangeFunction,
    defaultValue,
    meta: { error, touched, pristine }
  } = props;

  const onChangeInput = (event) => {
    event.preventDefault();
    event.persist();
    onChangeFunction(event);
  } 

  return (
    <FormGroup>
      <Label htmlFor={input.name}>{label}</Label>
      <Input
        valid={touched && !error && !pristine}
        invalid={touched && !!error}
        {...input}
        id={input.name}
        placeholder={placeholder}
        type={type}
        onChange={onChangeInput}
        value={defaultValue}
      />
      <FormFeedback>{error}</FormFeedback>
    </FormGroup>
  );
};

CustomInputField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  meta: PropTypes.object,
  placeholder: PropTypes.string
};

export default CustomInputField;
