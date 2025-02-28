import { Schema, object, string } from "yup";
import { useNavigate } from "react-router";
import { Trans, useTranslation } from "react-i18next";
import i18n, { LangList } from "src/translations";
import { InputField, SimpleSelect, PasswordField, Button } from "src/components/Elements";
import { loginWithCredentials, selectAuth } from "src/store/auth";
import { useAppDispatch } from "src/store";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";
import { FormProvider, useForm, Controller } from "react-hook-form";
import { LoginInput } from "src/types/index";
import { LoginBlock, LoginForm, Title, InputGroup, ForgetPasswordLink, StyledDivider } from "./styled";

const defaultValues: LoginInput = {
  email: "",
  password: "",
};

const loginSchema: Schema<LoginInput> = object().shape({
  email: string().min(4, i18n.t("Login must contain at least 4 characters").toString()).required(i18n.t("Name is required").toString()),
  password: string().min(6, i18n.t("Password must contain at least 6 characters").toString()).required(i18n.t("Enter your password").toString()),
});

function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { loading } = useSelector(selectAuth);

  const formMethods = useForm<LoginInput>({
    mode: "all",
    defaultValues,
    resolver: yupResolver(loginSchema),
  });

  const { formState, handleSubmit, control } = formMethods;
  const { isValid } = formState;

  const handleLogin = (input: LoginInput) => {
    dispatch(loginWithCredentials({ input }));
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <LoginBlock>
      <LoginForm>
        <Title>
          <h3>
            <Trans>Login to Dashboard</Trans>
          </h3>
          <p>
            <Trans>Remember that login attempts are limited and your IP may be blocked due to incorrect attempts.</Trans>
          </p>
        </Title>

        <FormProvider {...formMethods}>
          <InputGroup>
            <Controller
              control={control}
              name="email"
              render={({ field, fieldState }) => (
                <InputField type="text" variant="outlined" disabled={loading} label={<Trans>Login Name</Trans>} error={Boolean(fieldState.error)} helperText={fieldState.error?.message} {...field} />
              )}
            />
          </InputGroup>

          <InputGroup>
            <Controller
              control={control}
              name="password"
              render={({ field, fieldState }) => (
                <PasswordField variant="outlined" disabled={loading} label={<Trans>Password</Trans>} error={Boolean(fieldState.error)} helperText={fieldState.error?.message} {...field} />
              )}
            />
            <ForgetPasswordLink to="/forgetpassword">
              <Trans>Forget Password</Trans>
            </ForgetPasswordLink>
          </InputGroup>

          <InputGroup>
            <SimpleSelect items={LangList} onChange={(value: string) => changeLanguage(value)} valueKey="slug" label={<Trans>Select Language</Trans>} value={i18n.language} />
          </InputGroup>

          <InputGroup>
            <Button
              fullWidth
              variant="contained"
              loading={loading}
              disabled={loading || !isValid}
              onClick={handleSubmit(handleLogin)}
              title={<Trans>Sign In</Trans>}
              style={{ padding: "12px" }}
              icon={<span className="fad fa-user" />}
            />
            <StyledDivider>or</StyledDivider>
            <Button fullWidth variant="outlined" color="green" onClick={() => navigate("/register")} title={<Trans>Register Organization</Trans>} icon={<span className="fad fa-users" />} />
          </InputGroup>
        </FormProvider>
      </LoginForm>
    </LoginBlock>
  );
}

export default Login;
