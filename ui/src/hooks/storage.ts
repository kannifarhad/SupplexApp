import { useState } from "react";

export function useStorage(key: string, defaultValue?: any) {
  const [storedValue, setStoredValue] = useState(
    localStorage.getItem(key) || defaultValue
  );

  const set = (value: any): any => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      localStorage.setitem(key, value);
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, set];
}