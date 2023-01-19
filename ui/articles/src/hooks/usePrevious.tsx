import { useEffect, useRef } from 'react';

/* 
Allows to keep track of last value of any type.
Useful for selective updates triggered by useEffect
 */
export function usePrevious<T>(value: T) {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
