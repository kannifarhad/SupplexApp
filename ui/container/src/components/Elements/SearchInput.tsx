import { InputAdornment, CircularProgress } from "@mui/material";
import { useFormContext, Controller } from 'react-hook-form';
import { InputField, IconButton } from '.';

type SearchProps = {
    loading: boolean;
    disabled: any;
    name: string;
    label: string;
    helperText?: string;
    path: string;
    onClick: any;
};

const SearchInput: React.FC<SearchProps> = (props) => {
    const { loading, disabled, name, label, onClick, path, helperText } = props;
    const { control } = useFormContext<any>();

    return (
        <Controller
            control={control}
            name={`${path + name}`}
            render={({ field: { ref, ...fieldMethods }, fieldState }) => {
                return (
                    <InputField
                        type="text"
                        label={label}
                        variant="outlined"
                        helperText={helperText}
                        {...fieldMethods}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">
                                {loading
                                    ?
                                    <CircularProgress size={20} sx={{ marginRight: "10px" }} />
                                    :
                                    <IconButton
                                        size="small"
                                        title="Axtar"
                                        color="blue"
                                        icon={<span className="far fa-search"></span>}
                                        disabled={disabled}
                                        onClick={onClick}
                                    />
                                }
                            </InputAdornment>
                        }}
                    />
                );
            }}
        />
    );
};

export default SearchInput;