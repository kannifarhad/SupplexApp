import { SchemaOf, object,  string } from 'yup';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { Trans, useTranslation } from "react-i18next";
import { Box, Divider } from '@mui/material';
import { makeStyles } from '@mui/styles';
import i18n, { LangList } from "../../../translations";
import { InputField, SimpleSelect, PasswordField, Button } from '../../../components/Elements';
import { loginWithCredentials, selectAuth } from '../../../store/auth';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector } from "react-redux";
import { FormProvider, useForm, Controller } from 'react-hook-form';
import { LoginInput } from '../../../types/index';
import { useAppDispatch } from "../../../store";
import clsx from 'clsx'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  inputItems: {
    marginTop: "1.3rem",
    flexDirection:'column',
    display: 'flex',
  },
  textField: {
    width: 200,
  },
  loginIcon: {
    padding: '0px 0px 0px 0px',
    fontSize: '15px'
  },
  forgerPassLink:{
    marginLeft:'auto',
    textDecoration:'none',
    fontSize:'0.7rem',
    marginTop:'5px',
    // float:'right',
    color:'#999'
  }
});

const defaultValues: LoginInput = {
  email: '',
  password: ''
}

const loginSchema:SchemaOf<LoginInput> = object().shape({
  email: string()
          .min(4, i18n.t("Login must contain atleast 4 characters").toString())
          .required(i18n.t("Name is required").toString()),
  password: string()
    .min(6, i18n.t("Password must contain atleast 6 characters").toString())
    .required(i18n.t("Enter your password").toString()),
});

function Login() {
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { loading } = useSelector(selectAuth);

  const formMethods = useForm<LoginInput>({
      mode: "all",
      defaultValues,
      resolver: yupResolver(loginSchema),
  });

  const { formState, handleSubmit,  control } = formMethods;
  const { isValid, errors } = formState;

  const handleLogin = (input:LoginInput)=>{
    dispatch(
      loginWithCredentials({
        input
      })
    )
  }

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <>
      <Box className="loginBlock">
        <Box className="loginForm">
          <Box className="title">
            <h3>
              <Trans>Please Login to get Access</Trans>
            </h3>
            <p>
              <Trans>Remember that login attempts are limited and your IP may be blocked due to incorrect attempts.</Trans>
            </p>
          </Box>

          <FormProvider {...formMethods}>
            <Box className={clsx(classes.inputItems, 'form-group')}>
              <Controller
                  control={control}
                  name="email"
                  render={({ field: { ref, ...fieldMethods }, fieldState }) => {
                      return (
                          <InputField
                              type="text"
                              variant="outlined"
                              disabled={loading}
                              label={<Trans>Login Name</Trans>}
                              error={Boolean(fieldState.error)}
                              helperText={fieldState.error?.message}
                              {...fieldMethods}
                          />
                      );
                  }}
              />
            </Box>

            <Box className={clsx(classes.inputItems, 'form-group')}>
              <Controller
                  control={control}
                  name="password"
                  render={({ field: { ref, ...fieldMethods }, fieldState }) => {
                      return (
                          <PasswordField
                              variant="outlined"
                              disabled={loading}
                              label={<Trans>Password</Trans>}
                              error={Boolean(fieldState.error)}
                              helperText={Boolean(fieldState.error) ? 
                                    fieldState.error?.message : 
                                    <Trans>You can see the password by clicking on the eye icon</Trans>
                                  }
                              {...fieldMethods}
                          />
                      );
                  }}
              />
              <Link className={classes.forgerPassLink} to="/forgetpassword"> <Trans>Forget Password</Trans></Link>
            </Box>

            <Box className={clsx(classes.inputItems, 'form-group')}>
              <SimpleSelect
                items={LangList}
                onChange={(value:string) => changeLanguage(value)}
                // helperText={errors.language ? errors.language : ""}
                valueKey="slug"
                label={<Trans>Select Language</Trans>}
                variant="outlined"
                value={i18n.language}
              />
            </Box>

            <Box className={clsx(classes.inputItems, 'form-group')}>
              <Button
                fullWidth
                variant="contained"
                color="blue"
                isLoading={loading}
                disabled={loading || !isValid}
                onClick={handleSubmit((values) => {
                      handleLogin(values)
                  })
                }
                title={<Trans>Log me in</Trans>}
                icon={ !loading &&  <span className="fad fa-user"/>}
              />
              <Divider orientation="horizontal" flexItem style={{margin: "30px", color:"#999"}}>or</Divider>
              <Button
                fullWidth
                variant="outlined"
                color="green"
                onClick={()=> navigate('/register')}
                title={<Trans>Register Organization</Trans>}
                icon={
                  <span className={classes.loginIcon}> <span className="fad fa-users"/> </span>
                }
              />
            </Box>
          </FormProvider>
        </Box>
      </Box>
    </>
  );
}
export default Login;