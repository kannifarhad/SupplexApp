import { useState } from 'react'
import { TextField, InputAdornment, IconButton, TextFieldProps } from '@mui/material'

type UIInputField = {
    customInputProps?: any;
    className?: string;
    onChange?: (p: any) => any;
} & TextFieldProps;


const PasswordField: React.FC<UIInputField> = (props) => {
    const { onChange, ...rest } = props;
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleTriggerClick = () => {
        setShowPassword(!showPassword);
    }
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(onChange){
            onChange(event.target.value)
        }
    }
    return (
        <>
            <TextField
                fullWidth
                {...rest}
                onChange={handleChange}
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                    endAdornment:
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleTriggerClick}
                                size="small"
                            >
                                {showPassword ? <span className="far fa-eye" /> : <span className="far fa-eye-slash" />}
                            </IconButton>
                        </InputAdornment>

                }}
            />
        </>
    );
}

export default PasswordField;