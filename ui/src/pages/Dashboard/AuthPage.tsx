import React from "react";
import { Link } from "react-router-dom";
import Login from "./components/Login";
import { Helmet } from "react-helmet-async";
import { useTranslation, Trans } from "react-i18next";
import { StyledAuthPage } from "./styled";

const AuthPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{`${t("Login Panel")} | Cronus Dashboard`}</title>
      </Helmet>

      <StyledAuthPage className="wrapper loginWrap">
        <div
          className="loginInfo"
          style={{ backgroundImage: `url('/static/img/loginBg.jpg')` }}
        >
          <div
            className="bubbles"
            style={{ backgroundImage: `url('/static/img/loginBubbles2.svg')` }}
          ></div>

          <div className="cronusInfoWrap">
            <div className="iconBlock">
              <Link to="/">
                <object
                  type="image/svg+xml"
                  data="/static/img/logos/lineIcon.svg"
                >
                  <Trans>Your browser does not support SVGs</Trans>
                </object>
              </Link>
            </div>

            <div className="cronusInfo">
              <h3>
                <Trans>Welcome to Cronus!</Trans>
              </h3>
              <p>
                <Trans>
                  The dashboard is easy to use and provides a wide range of
                  features for businesses of all sizes. Features include data
                  analytics, reporting, and automated processes to help you
                  manage your business more effectively. The software is also
                  designed to be secure and reliable, with regular updates and
                  support.
                </Trans>
              </p>
            </div>

            <div className="cronusInfoFooter">
              <div className="copyright"> &copy; 2025 Cronus </div>
              <div>
                <Link to="/terms">
                  <Trans>Privacy</Trans>
                </Link>
                <Link to="/terms">
                  <Trans>Legal</Trans>
                </Link>
                <Link to="/terms">
                  <Trans>Contact</Trans>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="loginPanel">
          <Login />
        </div>
      </StyledAuthPage>
    </>
  );
};

export default AuthPage;