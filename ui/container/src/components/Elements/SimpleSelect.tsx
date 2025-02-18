import React, { useEffect, useState } from "react";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  MenuItem,
  ListSubheader,
  SelectProps
} from "@mui/material";
import _ from "lodash";
import { makeStyles } from '@mui/styles';
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  outlined: {
    transform: "translate(14px, 16px) scale(1)",
  },
  shrink: {
    transform: "translate(14px, -6px) scale(0.75)",
  },
});


interface UISimpleSelect extends SelectProps {
  id?: string;
  items: any[] ;
  value?: number | string | string[] | boolean | null | undefined;
  valueKey?: string;
  className?: string;
  helperText?: string;
  optionRender?: (item: any) => string | ReactJSXElement;
  onChange?: (p: any) => any;
  error?: boolean;
  label?: JSX.Element | string;
  labelId?: string;
}

type UIFunctions = {
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  generateValues: (valueArg: any) => any;
  initValues: (valueArg: any) => any;
  optionTitleGet: (option: any) => string;
  optionValueGet: (option: any) => string;
}

const SimpleSelect: React.FC<UISimpleSelect> = (props) => {
  const { items, className, helperText, valueKey, value, label, labelId, variant, optionRender, onChange, error, ...rest } = props;

  const [innerValue, setInnerValue] = useState<UISimpleSelect['value']>(value);

  const classes = useStyles();

  const outlinedClasses =
    variant === "outlined"
      ? { root: classes.outlined, shrink: classes.shrink }
      : {};

  const operations: UIFunctions = {
    handleChange: (event) => {
      setInnerValue(event.target.value);
      onChange && onChange(operations.generateValues(event.target.value));
    },

    generateValues: (valueArg) => {
      return valueKey ? _.result(_.find(items, [[valueKey], valueArg]), [valueKey], null) : valueArg;
    },

    initValues: (valueArg) => {
      if (valueArg == null) return '';

      if (valueKey) {
        return _.result(_.find(items, function(o) { return o[valueKey] == valueArg } ), [valueKey]);
      }
      else {
        return _.result(_.filter(items, function (v) { return v === valueArg }), 0, null)
      }
    },

    optionTitleGet: (option) => {
      return optionRender
        ? optionRender(option)
        : option.title
          ? option.title
          : "Siyahı düzgün formalaşmayıb!";
    },

    /**
     * valueKey qeyd edilibse item obyektinden [valuKey] property-si goturulur
     * valueKey qeyd edilmeyibse items arrayinda option-un index-i
     */
    optionValueGet: (option) => {
      return valueKey
        ?
        option[valueKey]
        :
        items.indexOf(option)
    },
  };

  useEffect(() => {
    setInnerValue(operations.initValues(value));

  }, [value]);


  return (
    <FormControl className={`${classes.root} ${className}`} error={error}    >
      <InputLabel id={labelId} classes={outlinedClasses}>
        {label}
      </InputLabel>

      <Select 
        className={classes.root}
        onChange={(e: any) => operations.handleChange(e)}
        value={innerValue ?? ''}
        label={label}
        error={error}
        {...rest}
      >
        {items && items.map((item: { type: string; title?: string; }, index: React.Key) => {
          return item.type && item.type === "group" ? (
            <ListSubheader color="primary" key={index} >
              {item.title}
            </ListSubheader>
          ) : (
            <MenuItem
              key={index}
              value={operations.optionValueGet(item)}
            >
              {operations.optionTitleGet(item)}
            </MenuItem>
          );
        })}
      </Select>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>


  );
};

export default SimpleSelect