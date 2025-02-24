import JwtDecode from "jwt-decode";
import { getToken, isTokenValid, refreshToken, setToken } from "../../../utils";

export const getAuthentication = async () => {
  const isValid = isTokenValid(await getToken());
  if (!isValid) {
    const newToken = await refreshToken();
    setToken(newToken);
  }
  const token = await getToken();

  if (token) {
    return `Bearer ${token}`;
  }

  return "";
};