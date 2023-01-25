import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation, Trans } from "react-i18next";
import image404 from './Blocks/Assets/images/403.svg';
import { Button } from '../../components/Elements';
import { Box } from '@mui/material';

export default function AccessDenied() {
  const { t } = useTranslation();
  const history = useHistory();
  return (
    <>
     <Helmet>
        <title>{`${t('Access Denied')} | Supplex Dashboard`}</title>
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
                <h2><Trans>This page exists but You don't have access to see it. You have to be in appropriate user group to get page.</Trans></h2>
                <p><Trans>Please contact to administrator to get access.</Trans></p>
                <Button 
                    icon={<span className="fas fa-tachometer-alt-fastest"/>}
                    title={<Trans>Go to Main Dashboard</Trans>}
                    onClick={()=> history.push('/')}
                />
                <Link to="/"></Link>
              </Box>
          </Box>
      </Box>
    </>
  );
}
