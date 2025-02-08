import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import { format, parse, parseISO } from "date-fns";
import { CSSProperties } from 'react';

export type UIDateType = string | Date | null;

type UIDatePickerProps = {
  onChange: (formattedDate: string | null) => void;
  label: string;
  dateformat?: string;
  helperText?: string;
  inputVariant?: "standard" | "filled" | "outlined";
  value: UIDateType;
  autoOk?: boolean;
  variant?: string;
  disabled?: boolean;
  error?: boolean;
  className?: string;
  style?: CSSProperties;
  disableFuture?: boolean;
  disablePast?: boolean;
  id?:string;
};

type Operations = {
  handleChange: (event: any) => void;
  initDate: (valueArg: UIDateType) => any;
};

const DatePickerCont: React.FC<UIDatePickerProps> = React.forwardRef(
  (props, ref) => {
    const {
      onChange,
      style,
      label,
      dateformat,
      inputVariant,
      value,
      autoOk,
      disabled,
      className,
      ...rest
    } = props;

    const [stateDate, stateDateChange] = useState<UIDateType>(null);
    const formatParsed = dateformat ?? "yyyy-MM-dd";

    const operations: Operations = {
      handleChange: (event: string) => {
        if (disabled) return;
        try {
          if (event) {
            stateDateChange(parseISO(new Date(event).toISOString()));
            onChange(format(new Date(event), formatParsed));
          } else {
            onChange(null);
          }
        } catch (error) {
          onChange(null);
        }
      },

      initDate: (valueArg: any) => {
        if (valueArg === '' || valueArg === null) return null;
        let dateParsed;
        try {
          dateParsed = parse(valueArg, formatParsed, new Date());
        } catch (error) {
          // console.log('initDate error', error);
        }
        return dateParsed;
      },
    };

    useEffect(() => {
      stateDateChange(operations.initDate(value))
    }, [value]);

    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label={label}
          value={stateDate}
          inputFormat={formatParsed}
          onChange={operations.handleChange}
          disabled={disabled}
          // adding this because datepicker cannot generate mask from format string and by default assigns __/__/____ 
          mask={formatParsed.replace(new RegExp(/\w/, 'g'), '_')}

          renderInput={(params) => <TextField
            {...params}
            fullWidth
            className={className}
            helperText={rest.helperText}
            error={rest.error || params.error}
            onBlur={() => { value === '' && onChange(null) }}
            style={style}
          />}

          {...rest}
        />
      </LocalizationProvider>
    );
  })

export default DatePickerCont