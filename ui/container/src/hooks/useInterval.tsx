import ms from "ms";
import { useEffect, useLayoutEffect, useRef } from "react";

export function useInterval(callback: () => void, delayStr: string = "10s") {
  const savedCallback = useRef<typeof callback>();
  const delay = ms(delayStr);

  // Keep latest callback
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Setup interval
  useEffect(() => {
    function tick() {
      savedCallback.current && savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => {
        clearInterval(id);
      };
    }
  }, [delay]);
}