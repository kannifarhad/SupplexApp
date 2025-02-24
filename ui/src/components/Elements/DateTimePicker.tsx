import * as React from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import { useEffect } from "react";
import { UIDateType } from "./DatePicker";
import { format, parse, parseISO } from "date-fns";
import { CSSProperties } from 'react';

interface UIDateTimePicker {
  onChange: (formattedDate: string | null) => void;
  label: string;
  dateformat?: string;
  helperText?: string;
  value: UIDateType;
  inputVariant?: "standard" | "filled" | "outlined";
  autoOk?: boolean;
  variant?: string;
  disabled?: boolean;
  error?: boolean;
  className?: string;
  style?: CSSProperties;
}

type Operations = {
  handleChange: (event: any) => void;
  initDate: (valueArg: UIDateType) => any;
};

export default function TimeDatePicker(props: UIDateTimePicker) {
  const {
    onChange,
    label,
    dateformat,
    helperText,
    inputVariant,
    disabled,
    value,
    ...rest
  } = props;

  const [selectedDate, handleDateChange] = React.useState<UIDateType>(
    new Date()
  );

  const formatParsed = dateformat ? dateformat : "dd/MM/yyyy HH:mm";

  const operations: Operations = {
    handleChange: (event: any) => {
      try {
        handleDateChange(parseISO(new Date(event).toISOString()));

        onChange(format(new Date(event), formatParsed));
      } catch (error) {
        onChange(null);
      }
    },

    initDate: (valueArg: any) => {
      let dateParsed;
      try {
        dateParsed = parse(valueArg, formatParsed, new Date());
      } catch (error) {
        console.log(error);
      }
      return dateParsed;
    },
  };

  useEffect(() => {
    handleDateChange(operations.initDate(value));
  }, [value]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} >
      <DateTimePicker
        {...rest}
        label={label}
        value={selectedDate}
        onChange={operations.handleChange}
        disabled={disabled}
        renderInput={(params: any) => 
        <TextField 
          fullWidth={true} {...params}
        />}
      />
    </LocalizationProvider>
  );
}
