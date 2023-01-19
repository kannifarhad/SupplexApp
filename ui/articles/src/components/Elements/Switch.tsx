import { FormControlLabel, Switch, SwitchProps, FormControlLabelProps } from '@mui/material';

interface SwitcherProps {
    label: FormControlLabelProps['label']
    name: SwitchProps['name']
    value: boolean
    place: FormControlLabelProps['labelPlacement']
    onChange: (value: boolean)=> void
    disabled?: boolean,
    error?: boolean,
    helperText?: string,
    color?: SwitchProps['color']
}

export function Switcher(props: SwitcherProps) {
  const { label, name, value, place, onChange, disabled, color } = props;

  const handleChange = (prop: any) => (event: any) => {
    onChange(event.target.checked);
  };

  return (
        <FormControlLabel
            control={
                <Switch disabled={disabled} checked={value} onChange={handleChange(name)} color={color ?? "primary"} value={name} />
            }
            labelPlacement={place}
            label={label}
        />
    );
}