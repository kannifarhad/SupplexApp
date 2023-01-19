import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  FormHelperText,
  RadioProps,
  RadioGroupProps,
  Tooltip,
  TooltipProps,
} from '@mui/material';
import { forwardRef } from 'react';

interface TPROPS extends Omit<TooltipProps, 'children'> {
  children?: any;
}
export interface RadioGroupItem extends RadioProps {
  label?: string | JSX.Element;
  value: string;
  color?: any;
  visible?: any;
  tooltipOptions?: TPROPS;
  icon?: JSX.Element;
}

interface RadioGroupComponentProps extends RadioGroupProps {
  value?: string | null;
  items: Array<RadioGroupItem>;
  label?: string | JSX.Element;
  onChange?: (value: any) => void;
  error?: boolean;
  helperText?: string;
  radioProps?: any;
  disabled?: boolean;
}

export default forwardRef(
  ({ error, items, label, onChange, radioProps, helperText, value, disabled, ...rest }: RadioGroupComponentProps, ref) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, value: string) => {
      onChange && onChange(value);
    };

    return (
      <FormControl error={error}>
        {label && <FormLabel>{label}</FormLabel>}
        <RadioGroup onChange={handleChange} row value={value ?? ''} {...rest}>
          {items.map((item, index) => {
            const { label, value, color, visible = true, disabled: disable, tooltipOptions, icon } = item;

            return (
              <Tooltip
                key={index}
                disableHoverListener={!Boolean(tooltipOptions)}
                placement={'top'}
                arrow
                title=''
                {...tooltipOptions}
                componentsProps={{
                  tooltip: {
                    sx: {
                      bgcolor: 'black',
                      fontSize: 13,
                      lineHeight: 1.5,
                    },
                  },
                }}
              >
                <FormControlLabel
                  key={index}
                  label={icon ? <>{icon} {label}</> : label}
                  value={value ?? ''}
                  sx={{ color: color, display: visible ? 'flex center' : 'none' }}
                  disabled={Boolean(disabled || disable)}
                  control={<Radio {...radioProps} />}
                />
              </Tooltip>
            );
          })}
        </RadioGroup>
        <FormHelperText sx={{ margin: 0 }}>{helperText}</FormHelperText>
      </FormControl>
    );
  }
);
