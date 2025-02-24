import { memo } from "react";
import { Link } from "react-router-dom";
import { StyledFooter } from "./styled";

const Footer = () => {
  const today = new Date().getFullYear();
  return (
    <StyledFooter>
      <div className="copyright">
        {today.toString()}&nbsp;&copy;&nbsp;
        <a href="http://kanni.pro/" rel="noopener noreferrer" target="_blank">
          Cronus Dashboard
        </a>
      </div>
      <div>
        <Link to="/terms">Privacy</Link>
        <Link to="/legal">Legal</Link>
        <Link to="/contact">Contact</Link>
      </div>
    </StyledFooter>
  );
};

export default memo(Footer);
