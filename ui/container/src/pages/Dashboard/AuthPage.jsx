import React from 'react';
import { Link } from 'react-router-dom';
// import Login from './Blocks/Login';
import { Helmet } from 'react-helmet';
import { Translate, TranslateFunc } from '../../utils';

// import socketIOClient from "socket.io-client";
// const ENDPOINT = "http://localhost:3131";

export default function AuthPage() {
  //   useEffect(() => {
  //     console.log('useEffect');
  //     const socket = socketIOClient(ENDPOINT);
  //     socket.on("item", data => {
  //         console.log('SOCKETTTT',data);
  //     });
  // }, []);
  const { translateWord } = TranslateFunc();

  return (
    <>
      <Helmet>
        <title>{`${translateWord('Login Panel')} | Cronus Dashboard`}</title>
      </Helmet>

      <div className="wrapper loginWrap">
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
                <object type="image/svg+xml" data={'/static/img/logos/lineIcon.svg'}>
                <Translate>Your browser does not support SVGs</Translate>
                </object>
              </Link>
            </div>

            <div className="cronusInfo">
              <h3><Translate>Welcome to Cronus!</Translate></h3>
              <p><Translate>The ultimate React, NodeJs and PostgerSQL admin system for next generation web apps.</Translate>
              </p>
            </div>

            <div className="cronusInfoFooter">
              <div className="copyright"> &copy; 2020 Cronus PERN </div>
              <div>
                <Link to="/terms"> <Translate>Privacy </Translate></Link>
                <Link to="/terms"> <Translate>Legal</Translate> </Link>
                <Link to="/terms"> <Translate>Contact</Translate> </Link>
              </div>
            </div>
          </div>
        </div>
        {/* loginInfo end */}

        <div className="loginPanel">
          {/* <Login /> */}
        </div>
      </div>
    </>
  );
}
