import JwtDecode from "jwt-decode";
import * as Sentry from "@sentry/react";
import { getToken, isTokenValid, refreshToken, setToken } from "../../../utils";
import { uuid4 } from "@sentry/utils";

export const getAuthentication = async () => {
  const isValid = isTokenValid(await getToken());
  if (!isValid) {
    const newToken = await refreshToken();
    setToken(newToken);
  }
  const token = await getToken();

  if (token) {
    const user = JwtDecode(token) as any;
    Sentry.configureScope((scope) => {
      scope.setUser({
        name: [user.firstname, user.lastname].join(" "),
        wwid: user.wwid,
        username: user.username,
      });
    });

    return `Bearer ${token}`;
  }

  Sentry.configureScope((scope) => {
    scope.setUser(null);
  });

  return "";
};

/**
 * @description Generate, set and return a new transaction ID to trace errors
 * @return {*}
 */
export function setTransactionId() {
  const transactionId = uuid4();
  Sentry.configureScope(function (scope) {
    scope.setTag("transaction_id", transactionId);
  });
  return transactionId;
}
