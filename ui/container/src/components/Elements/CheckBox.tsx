import { FormControlLabel, Checkbox, FormControl,FormHelperText, CheckboxProps } from '@mui/material';

export interface CheckBoxPropsLocal extends CheckboxProps {
    value?: boolean;
    label?: string | JSX.Element;
    onChange?: (prop?: any, value?: any) => void;
    disabled?: boolean;
    error?: boolean;
    helperText?: string | JSX.Element;
    required?: boolean;
};

export default ({ value, label, error,helperText, onChange, ...rest }: CheckBoxPropsLocal) => {
    return (

        <FormControl
            required={rest.required}
            error={error}
            style={{margin: "auto 0"}}
            >
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={Boolean(value)}
                            onChange={onChange}
                            color='primary'
                            {...rest}
                        />
                    }
                    label={label}
                />
        {helperText ? <FormHelperText>{helperText}</FormHelperText> : ''}
        </FormControl>
    );
}