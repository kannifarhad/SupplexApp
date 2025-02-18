import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { LAST_LOCATION_KEY, LAST_LOCATION_WAS_LOGGEDIN_KEY, LOCATION_SKIP_LIST} from '../../constants'
import { selectAuth } from "../../store/auth";

export default function useLocationSaver() {
  const location = useLocation();
  const { user } = useSelector(selectAuth);
  // const lastLocation = window.localStorage.getItem(LAST_LOCATION_KEY);

  // useEffect(() => {
  //   console.log("Known location ", lastLocation);
  // }, [lastLocation]);

  useEffect(() => {
    const path = location.pathname + location.search;
    if (!LOCATION_SKIP_LIST.includes(location.pathname)) {
      window.localStorage.setItem(LAST_LOCATION_KEY, path);
      window.localStorage.setItem(LAST_LOCATION_WAS_LOGGEDIN_KEY, JSON.stringify(!!user));
    }
    // analytics.sendPageView(path)
  }, [location, user]);
}
