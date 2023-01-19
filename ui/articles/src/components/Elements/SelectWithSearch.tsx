import React, { useState, useEffect, forwardRef } from "react";

import {
  Autocomplete,
  AutocompleteProps,
  SxProps,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import clsx from "clsx";
import _ from "lodash";

type UISelectItem = {
  [x: string]: any;
};

// TODO
export type SelectWithSearchProps = {
  items: UISelectItem[];
  value?: string | number | null | any[];
  label?: string;
  valueKey?: string;
  className?: string;
  helperText?: React.ReactNode;
  optionRender?: (item: any) => string;
  onChange?: (p: any) => any;
  error?: boolean;
  variant?: TextFieldProps["variant"];
  multiple?: boolean;
  placeholder?: string;
  style?: any;
  sx?: SxProps;
  disabled?: boolean;
  fullWidth?: boolean;
  noOptionsText?: React.ReactNode;
  optionKey?: string,
  // equalityKey?: string,
  freeSolo?: boolean
  onChangeTextField?: (p: any) => any;
}; //& SelectProps;

type UIFunctions = {
  handleChange: (e: string) => void;
  generateValues: (valueArg: any) => any;
  initValues: (valueArg: any) => any;
  optionTitleGet: (option: any) => string;
  optionValueGet: (option: any) => string;
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]': {
      padding: "0px 5px !important",
    },
    "& .MuiAutocomplete-input": {
      minWidth: "200px",
    },
  },
  outlined: {
    transform: "translate(14px, 16px) scale(1)",
  },
  shrink: {
    transform: "translate(14px, -6px) scale(0.75)",
  },
}));

export const SelectWithSearch: React.FC<SelectWithSearchProps> = forwardRef(
  (props, ref) => {
    const {
      items,
      className,
      label,
      helperText,
      valueKey,
      optionRender,
      value,
      onChange,
      error,
      variant,
      optionKey,
      onChangeTextField,
      ...rest
    } = props;
    const classes = useStyles();

    const operations: UIFunctions = {
      handleChange: (value) => {
        setInnerValue(value);
        onChange && onChange(operations.generateValues(value));
      },

      generateValues: (valueArg) => {
        return valueKey
          ? rest.multiple
            ? valueArg.map((v: UISelectItem) => v && v[valueKey])
            : valueArg && valueArg[valueKey]
          : valueArg;
      },

      initValues: (valueArg) => {
        let result: UISelectItem | string | null = "";
        if (rest.multiple) {
          result = !Array.isArray(valueArg)
            ? []
            : valueKey
              ? (items as UISelectItem[]).filter((v) =>
                valueArg.includes(v[valueKey])
              )
              : items.filter((v) => valueArg.includes(v));
        } else {
          // result = _.result(
          //   valueKey
          //     ? _.find(items, [[valueKey], valueArg])
          //     : items.filter((v) => _.isEqual(v, valueArg)),
          //   0,
          //   null
          // );
          result = _.find(items, [[valueKey], valueArg]) ?? null;
        }
        return result;
      },

      optionTitleGet: (option) => {
        return optionRender
          ? optionRender(option)
          : option.title
            ? option.title
            : "Siyahı düzgün formalaşmayıb!";
      },
      optionValueGet: (option) => {
        return valueKey ? option[valueKey] : items.indexOf(option);
      },
    };

    const [innerValue, setInnerValue] = useState<string | null | UISelectItem>(null || []);

    useEffect(() => {
      setInnerValue(operations.initValues(value));
    }, [value]);


    return (
      <Autocomplete
        {...rest}
        className={clsx("", className, {})}
        options={items}
        key={valueKey}
        value={innerValue}
        getOptionLabel={(option) =>
          optionRender
            ? optionRender(option)
            : option.title
              ? option.title
              : "Siyahı düzgün formalaşmayıb!"
        }
        isOptionEqualToValue={valueKey ? (option, value) => option[valueKey] === value[valueKey] : undefined}
        filterSelectedOptions={true}
        onChange={(event: any, value: any) => operations.handleChange(value)}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            onChange={(e) => onChangeTextField && onChangeTextField(e.target.value)} // TODO: NOT TESTED
            // className={classes.input}
            placeholder={rest.placeholder || "Type to search"}
            fullWidth
            variant={variant}
            error={error}
            helperText={helperText}
          />

        )}
        noOptionsText={rest?.noOptionsText ?? 'Nəticə tapılmadı'}
      />
    );
  }
);

export default SelectWithSearch;
