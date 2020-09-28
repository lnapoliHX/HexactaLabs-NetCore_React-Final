import React from "react";
import PropTypes from "prop-types";
import { Input, Label, FormFeedback, FormGroup } from "reactstrap";

const SelectField = props => {
  const {
    multiple,
    input,
    label,
    type,
    options,
<<<<<<< HEAD
    value,
    onChangeFunction,
    defaultValue,
    meta: { touched, error, pristine }
  } = props;

  //console.log('selectField value:', value);
  //console.log('props', props);
  input.value = value;
  //console.log('input:', input);

=======
    meta: { touched, error, pristine }
  } = props;

>>>>>>> 6df99f5f4d613fd1494eaa06a4f06e9e68db8cb4
  return (
    <FormGroup>
      <Label htmlFor={input.name}>{label}</Label>
      <Input
        {...input}
        valid={touched && !error && !pristine}
        invalid={touched && !!error}
        name={input.name}
        id={input.name}
        type={type || "select"}
        multiple={multiple}
<<<<<<< HEAD
        onChange={onChangeFunction}
        value={defaultValue}
        defaultValue={onChangeFunction}
      >
        {options.map(each => 
                (<option key={each.id} {...each}>
                  {each.label}
                </option>)
             )}
=======
      >
        {options.map((each, index) => (
          <option key={index} {...each}>
            {each.label}
          </option>
        ))}
>>>>>>> 6df99f5f4d613fd1494eaa06a4f06e9e68db8cb4
      </Input>
      <FormFeedback>{error}</FormFeedback>
    </FormGroup>
  );
};

SelectField.propTypes = {
  multiple: PropTypes.bool,
  input: PropTypes.object,
  label: PropTypes.string,
  type: PropTypes.string,
  options: PropTypes.array,
  meta: PropTypes.object
};

export default SelectField;
