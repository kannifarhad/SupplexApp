import { selectTheme, setTheme } from "src/store/dashboard";
import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";
import FabButton from "src/components/Elements/FabButton";

const ThemeModeSwitch = () => {
  const distpatch = useDispatch();
  const themeName = useSelector(selectTheme);
  const isDark = useMemo(()=>themeName === "dark",[themeName]);

  const toggleDarkMode = () => {
    distpatch(setTheme(isDark ? "light" : "dark"));
  };

  return (
    <FabButton
      onClick={toggleDarkMode}
      title="Switch theme mode"
      color={isDark ? 'orange': 'gray'}
      icon={<span className={`fad ${isDark ? 'fa-sun-bright': 'fa-moon-stars'}`} />}
    />
  );
};

export default ThemeModeSwitch;
