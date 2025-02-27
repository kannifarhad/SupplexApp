import React, { useEffect, useMemo, useState } from "react";
import { InputAdornment } from "@mui/material";
import { Box, Paper, TextField, Autocomplete, TextFieldProps, Popper } from "@mui/material";
import { countriesArray, countriesByCode, CountryType } from "src/constants/countries";
import { IMaskInput } from "react-imask";
import { getCountryFlagIMG } from "src/utils";

type PhoneNumberStateType = { country: CountryType | undefined; phoneNumber: string };

export type PhoneFieldProps = {
  excludeCountries?: CountryType["code"][];
  onlyCountries?: CountryType["code"][];
  defaultCountry?: CountryType["code"];
  placeholder?: string;
  onChange: (props?: { country: CountryType; phoneNumber: string }) => void;
  value: string | undefined;
} & TextFieldProps;

export function parsePhoneNumber(number: string): { country?: CountryType; phoneNumber: string } {
  const normalizedNumber = number.replace(/[^\d+]/g, "");

  for (const country of countriesArray) {
    if (normalizedNumber.startsWith("+" + country.phone)) {
      return {
        country,
        phoneNumber: normalizedNumber.slice(("+" + country.phone).length),
      };
    }
  }
  return { phoneNumber: normalizedNumber };
}

const InputGroup: React.FC<PhoneFieldProps> = ({ onChange, excludeCountries, onlyCountries, placeholder = "Phone number", defaultCountry, value, ...rest }) => {
  const [phoneNumber, setPhoneNumber] = useState<PhoneNumberStateType>(() => {
    if (value) {
      const { country, phoneNumber } = parsePhoneNumber(value);
      return { country, phoneNumber };
    }
    return { country: defaultCountry ? countriesByCode[defaultCountry] : undefined, phoneNumber: "" };
  });

  const options: CountryType[] = useMemo(() => {
    if (onlyCountries && Array.isArray(onlyCountries)) {
      return onlyCountries.map((code) => countriesByCode[code]);
    }
    if (excludeCountries && Array.isArray(excludeCountries)) {
      return countriesArray.filter((cont) => !excludeCountries.includes(cont.code));
    }
    return countriesArray;
  }, [excludeCountries, onlyCountries]);

  useEffect(() => {
    if (phoneNumber.country && phoneNumber.phoneNumber) {
      onChange({ country: phoneNumber.country, phoneNumber: phoneNumber.phoneNumber });
    } else {
      onChange();
    }
  }, [phoneNumber]);

  return (
    <TextField
      fullWidth
      {...rest}
      placeholder={placeholder}
      sx={{
        "& .MuiOutlinedInput-root": {
          padding: 0,
        },
        "& .MuiAutocomplete-root": {
          flex: 1,
        },
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "rgba(0, 0, 0, 0.23)",
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: "black",
        },
      }}
      InputProps={{
        startAdornment: (
          <Autocomplete
            sx={{ minWidth: "110px" }}
            id="country-select-demo"
            options={options}
            value={phoneNumber.country}
            autoHighlight
            getOptionLabel={(option) => `+${option.phone}`}
            onChange={(_, newValue) =>
              setPhoneNumber((prev) => ({
                ...prev,
                country: newValue ?? undefined,
                phoneNumber: "",
              }))
            }
            PopperComponent={(props) => <Popper {...props} placement="bottom-start" sx={{ width: "250px !important" }} />}
            renderOption={(props, option) => {
              const { key, ...optionProps } = props;
              return (
                <Box component="li" sx={{ "& > img": { mr: 2, flexShrink: 0 } }} {...optionProps} key={`${option.code}-${option.phone}`}>
                  {getCountryFlagIMG({ country: option.code.toLowerCase() })}
                  {option.label} ({option.code}) +{option.phone}
                </Box>
              );
            }}
            renderInput={(params) => {
              const { country } = phoneNumber;
              const displayFlag = country ? getCountryFlagIMG({ country: country.code.toLowerCase() }) : null;
              const displayPhone = country ? `+${country.phone}` : "";

              return (
                <TextField
                  {...params}
                  variant="outlined"
                  size="small"
                  placeholder="Select"
                  sx={{
                    "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                    paddingLeft: "10px",
                  }}
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: displayFlag ? (
                      <InputAdornment position="start" sx={{ marginRight: "0px" }}>
                        {displayFlag}
                      </InputAdornment>
                    ) : null,
                  }}
                  value={displayPhone}
                />
              );
            }}
            disableClearable
          />
        ),
        inputComponent: IMaskInput as any,
        inputProps: {
          mask: phoneNumber?.country?.phoneMask ?? "#############",
          definitions: { "#": /[0-9]/ },
          overwrite: true,
          value: phoneNumber.phoneNumber,
          onAccept: (value: string) =>
            setPhoneNumber((prev) => ({
              ...prev,
              phoneNumber: value,
            })),
        },
      }}
    />
  );
};

export default InputGroup;