import   { useState, } from "react";
import * as store from "store";


export function useStorage(key:string, defaultValue?: any) {
    const [storedValue, setStoredValue] = useState(store.get(key, defaultValue))
  
    const set = (value:any):any => {
      try {
        // Allow value to be a function so we have same API as useState
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        // Save state
        setStoredValue(valueToStore);
        store.set(key, value)
      } catch (error) {
        console.log(error);
      }
    };

    return [storedValue, set];
  }