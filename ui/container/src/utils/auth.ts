import jwtDecode from "jwt-decode";
import * as storage from "store";
import { refreshingClient } from "../services/clients/apolloClient";
import { REFRESH_TOKEN } from "../services/graphql";
import { RefreshTokenMutation } from "../types";

export const getToken = (): string => {
  return storage.get("jwt");
};

export const setToken = (token: string) => {
  storage.set("jwt", token);
};

export const resetToken = () => {
  console.log("Resetting token...");
  return storage.remove("jwt");
};

export const refreshToken = async () => {
  console.log("Refreshing token...");
  try {
    const { data } = await refreshingClient.mutate<RefreshTokenMutation>({
      mutation: REFRESH_TOKEN,
    });
    return data?.refreshToken.token || "";
  } catch (error) {
    console.log("unable to refresh, closing session");
    return getToken();
  }
};

export function isTokenValid(token: string) {
  if (!token) return true;
  const { exp } = jwtDecode(token) as any;
  return Date.now() < exp * 1000;
}
