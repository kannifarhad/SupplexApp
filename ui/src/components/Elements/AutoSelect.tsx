import { Autocomplete, TextField } from "@mui/material";
import { makeStyles } from '@mui/styles';
import { SyntheticEvent } from "react";

const useStyles = makeStyles({
    inputRoot: {
        padding: "0 !important"
    }
});

type UIAutoSelect = {
    id: string;
    options: any[];
    value: string;
    onChange?: (p: any) => any;
    [x: string]: any;
};

const AutoSelect: React.FC<UIAutoSelect> = (props) => {
    const { options, onChange, inputProps, ...rest } = props;
    const classes = useStyles();

    const handleChange = (event: SyntheticEvent, value: any) => {
        (onChange) && onChange(value);
    }

    return (
        <Autocomplete
            classes={{
                inputRoot: classes.inputRoot
            }}
            options={options}
            getOptionLabel={(option) => option.title}
            renderInput={
                (props) => <TextField
                    // size="small" 
                    variant="outlined"
                    {...props}
                    {...inputProps}
                />}
            {...rest}
            onChange={handleChange}
        />);
}

export default AutoSelect;