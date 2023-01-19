import { Box, FormControl, FormLabel, FormControlLabel, Checkbox, FormHelperText, SxProps } from '@mui/material';

type CheckBoxGroupItem = {
    label: string;
    value: string;
    disabled?: boolean;
}

type CheckBoxGroupProps = {
    items: Array<CheckBoxGroupItem>;
    title?: string | JSX.Element;
    value: string[];
    onChange: (value: any) => void;
    error?: boolean
    helperText?: string | JSX.Element;
    sx?: SxProps;
}

export default ({ items, title, value, onChange, error, helperText, sx, ...rest }: CheckBoxGroupProps) => {
    return (
        <Box display={'flex'} flexDirection={'column'}>
            <FormControl error={error} sx={sx} >
                {title && <FormLabel>{title}</FormLabel>}
                {
                    items.map((item, index) =>
                        <FormControlLabel
                            key={index}
                            control={
                                <Checkbox
                                    {...item}
                                    color='primary'
                                    onChange={() => { onChange(item.value) }}
                                    checked={value.includes(item.value)}
                                />
                            }
                            label={item.label}
                            {...rest}
                        />
                    )
                }
                <FormHelperText sx={{ margin: 0 }}>{helperText}</FormHelperText>
            </FormControl>
        </Box>
    );
};
