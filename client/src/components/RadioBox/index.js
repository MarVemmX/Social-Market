import React from 'react';
import PropTypes from 'prop-types';
import { FormControlLabel, Radio, RadioGroup } from '@material-ui/core';
import { Controller } from 'react-hook-form';

RadioField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  dataList: PropTypes.array.isRequired,
};

function RadioField(props) {
  const { form, name, inline, defaultValue, dataList } = props;
  const {
    formState: { errors },
  } = form;
  const hasError = errors[name];

  return (
    <Controller
      name={name}
      control={form.control}
      render={({
        field: { onChange, onBlur, value, name, ref },
        fieldState: { invalid, isTouched, isDirty, error },
        formState,
      }) => (
        <RadioGroup
          onChange={onChange}
          name={name}
          value={value}
          row={inline}
          defaultValue={defaultValue}
          error={!!hasError}
          helperText={errors[name]?.message}
        >
          {dataList.map((item) => (
            <FormControlLabel value={item.value} control={<Radio />} label={item.name} />
          ))}
        </RadioGroup>
      )}
    />
  );
}

export default RadioField;
