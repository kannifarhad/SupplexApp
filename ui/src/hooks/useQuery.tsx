import {useMemo} from "react";
import { useLocation } from "react-router-dom";

export declare type Params<Key extends string = string> = {
  readonly [key in Key]: string | undefined;
};

export const useQuery = <Params extends { [K in keyof Params]?: string } = {}>(): URLSearchParams extends { [K in keyof Params]?: string | undefined; } ? any : any => {
  const { search } = useLocation();
  const params = useMemo(() => new URLSearchParams(search), [search]);
  return new Proxy(params, {
      get(target, prop: string) {
          return target.get(prop)
      },
  });
}
export default useQuery;