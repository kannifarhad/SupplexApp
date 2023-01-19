import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Translate, TranslateFunc } from '../../utils';
import image404 from './Blocks/Assets/images/403.svg';
import { Button } from '../../components/Elements';
import { Box } from '@mui/material';

export default function AccessDenied() {
  const { translateWord } = TranslateFunc();
  const history = useHistory();
  return (
    <>
     <Helmet>
        <title>{`${translateWord('Access Denied')} | Cronus Dashboard`}</title>
      </Helmet>

      <div className="row wrapper">
        <div className="col-xl-12 marginBottom-20">
          {/* <ButtonList buttons={PostButtons.postsAdd} /> */}
        </div>
      </div>
      <Box className="whiteBlock">
          <Box className="accessDenied">
              <Box className="image">
                <img alt="access denied" src={image404} />
              </Box>
              <Box className="texts">
                <h2><Translate>This page exists but You don't have access to see it. You have to be in appropriate user group to get page.</Translate></h2>
                <p><Translate>Please contact to administrator to get access.</Translate></p>
                <Button 
                    icon={<span className="fas fa-tachometer-alt-fastest"/>}
                    title={<Translate>Go to Main Dashboard</Translate>}
                    onClick={()=> history.push('/')}
                />
                <Link to="/"></Link>
              </Box>
          </Box>
      </Box>
    </>
  );
}
