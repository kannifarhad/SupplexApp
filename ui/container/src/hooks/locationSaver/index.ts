import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { LAST_LOCATION_KEY, LAST_LOCATION_WAS_LOGGUEDIN_KEY} from '../../constants'
import { selectAuth } from "../../store/auth";

export default function useLocationSaver() {
  const location = useLocation();
  const { user } = useSelector(selectAuth);
  const lastLocation = window.localStorage.getItem(LAST_LOCATION_KEY);
  const skipList = ["/logout", "/login", "/", "/jnj-auth/callback/oauth"];

  useEffect(() => {
    console.log("Known location ", lastLocation);
  }, []);

  useEffect(() => {
    const path = location.pathname + location.search;
    if (!skipList.includes(location.pathname)) {
      window.localStorage.setItem(LAST_LOCATION_KEY, path);
      window.localStorage.setItem(LAST_LOCATION_WAS_LOGGUEDIN_KEY, JSON.stringify(!!user));
    }
    // analytics.sendPageView(path)
  }, [location]);
}
