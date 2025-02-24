import React, { forwardRef, } from 'react';
import { TextField, TextFieldProps, InputLabel, FormControl, OutlinedInput, FormHelperText, OutlinedInputProps } from '@mui/material'
import { IMaskInput } from 'react-imask';
import _ from 'lodash';
type UIInputField = {
  maskProps?: any;
  customInputProps?: any;
  className?: string;
  onChange?: (p: any) => any;
} & TextFieldProps;

export const InputField: React.FC<UIInputField> = forwardRef((props, ref) => {
  const { maskProps, ...rest } = props;
  return (
    <>
      {maskProps ?
        <MaskedInput
          {...props}
        />
        :
        <SimpleInput
          {...rest}
        />
      }
    </>
  );
})

export const SimpleInput: React.FC<UIInputField> = forwardRef((props, ref) => {
  const { onChange, multiline, customInputProps, value, ...rest } = props;
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = rest.type === 'number' ? _.toNumber(event.target.value) : event.target.value;
    onChange && onChange(value);
  }
  return (
    <>
      <TextField
        fullWidth
        onChange={handleChange}
        multiline={multiline ?? undefined}
        value={value ?? ''}
        {...rest}
      />
    </>
  );
})


interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
  maskProps: any;
}

const TextMaskCustom = React.forwardRef<HTMLElement, CustomProps>(
  function TextMaskCustom(props, ref) {
    const { onChange, maskProps, ...other } = props;
    const handleChange = (value: string) => {
      const placeholder: string = maskProps.placeholderChar || '_';
      const trimmedValue = value.replaceAll(placeholder, '');
      onChange({ target: { name: props.name, value: trimmedValue } })
    }
    return (
      <IMaskInput
        lazy={false}
        {...other}
        {...maskProps}
        onAccept={handleChange}
        overwrite
      />
    );
  },
);

function MaskedInput(props:UIInputField) {
    const { onChange, multiline, customInputProps, value, label, error, helperText, maskProps, type, ...rest } = props;
  
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = type === 'number' ? parseFloat(event.target.value) : event.target.value;
        onChange && onChange(value);
    }
  
    return (
        <FormControl variant="outlined" color={error ? 'error': 'primary'} fullWidth>
            <InputLabel 
              htmlFor="formatted-text-mask-input" 
              style={{background:'#fff'}}
              shrink={Boolean(value) || !Boolean(maskProps.lazy)}
            > 
            { error ? <span style={{ color: '#d32f2f' }}>{label}</span> : label }
            </InputLabel>
            <OutlinedInput
                label={label}
                value={String(value) || ''}
                type={type}
                error={error}
                fullWidth
                {...rest as OutlinedInputProps}
                onChange={handleChange}
                id="formatted-text-mask-input"
                inputComponent={TextMaskCustom as any}
                inputProps={{
                    maskProps
                }}
                {...customInputProps}
            />
          <FormHelperText id="outlined-weight-helper-text">
            { error ? <span style={{ color: '#d32f2f' }}>{helperText}</span> : helperText }
          </FormHelperText>
      </FormControl>
    );
}


export default InputField;
