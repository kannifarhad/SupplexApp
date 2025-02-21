import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputAdornment, IconButton, Grid } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  DatePicker,
  InputField,
  PasswordField,
  SelectWithSearch,
  SimpleSelect,
  ButtonGroup,
} from "src/components/Elements";
import { AllUsers } from "../routes";
// import FileManagerPopup from "../../Components/Elements/FileManagerPopup";
// import Translate from "../../Utils/Translate";

interface UserFormInputs {
  name: string;
  login: string;
  mail: string;
  status: string;
  password: string;
  passwordRepeat: string;
  image?: string;
  phone?: string;
  address?: string;
  profession?: string;
  createdAt: Date;
  groupId: number;
}

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .min(4, "Login must contain at least 4 characters")
    .required("Name is required"),
  login: yup
    .string()
    .min(4, "Login must contain at least 4 characters")
    .required("Login is required"),
  mail: yup.string().email("Enter a valid email").required("Email is required"),
  status: yup
    .string()
    .min(1, "Status must contain at least 1 character")
    .required("Status is required"),
  password: yup
    .string()
    .min(6, "Password must contain at least 6 characters")
    .required("Enter your password"),
  passwordRepeat: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Confirm your password"),
  image: yup.string().url("Image Path is not valid").optional(),
  phone: yup.string().optional(),
  address: yup.string().optional(),
  profession: yup.string().optional(),
  createdAt: yup.date().default(() => new Date()),
  groupId: yup.number().required("Group is required"),
});

const UserAddForm: React.FC<{
  addUser: Function;
  addMessage: Function;
  userGroupsList: any[];
}> = ({ addUser, addMessage, userGroupsList }) => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<UserFormInputs>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: "",
      login: "",
      mail: "",
      status: "",
      password: "",
      passwordRepeat: "",
      image: "",
      phone: "",
      address: "",
      profession: "",
      createdAt: new Date(),
      groupId: 0,
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [openFileManager, setOpenFileManager] = useState(false);

  const onSubmit = (data: UserFormInputs) => {
    addUser(data)
      .then(() => {
        navigate("/user/list");
        addMessage([
          {
            title: "Changes successfully saved",
            type: "success",
            message: "Changes successfully saved",
            timer: 3000,
          },
        ]);
      })
      .catch((error: Error) => {
        addMessage([
          {
            title: "Error happened while saving",
            type: "error",
            message: error.message,
          },
        ]);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid>
        <Grid item xs={6}>
          <div className="whiteBlock">
            <div className="blockHead">
              <h3>User Information</h3>
              <span>The required fields must be filled.</span>
            </div>
            <div className="blockBody">
              <Grid container spacing={2} style={{ padding: "20px" }}>
                <Grid item xs={12}>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <InputField
                        {...field}
                        label="Name of user"
                        error={!!errors.name}
                        helperText={errors.name?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Controller
                    name="login"
                    control={control}
                    render={({ field }) => (
                      <InputField
                        {...field}
                        label="Login name"
                        error={!!errors.login}
                        helperText={errors.login?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={6}>
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <PasswordField
                        {...field}
                        label="New Password"
                        type={showPassword ? "text" : "password"}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={6}>
                  <Controller
                    name="passwordRepeat"
                    control={control}
                    render={({ field }) => (
                      <PasswordField
                        {...field}
                        label="Repeat New Password"
                        type={showRepeatPassword ? "text" : "password"}
                        error={!!errors.passwordRepeat}
                        helperText={errors.passwordRepeat?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Controller
                    name="groupId"
                    control={control}
                    render={({ field }) => (
                      <SimpleSelect
                        {...field}
                        items={userGroupsList}
                        label="User Group"
                      />
                    )}
                  />
                </Grid>
              </Grid>

            </div>
          </div>
        </Grid>
        <Grid item xs={12}>
          <ButtonGroup
            buttonList={[
              {
                type: "submit",
                title: "Save and Quit",
                color: "green",
                icon:<span className="fad fa-save" />,
                onClick: handleSubmit(onSubmit),
              },
              {
                type: "reset",
                title: "Cancel",
                color: "info",
                icon:<span className="fad fa-cancel" />,
                onClick: ()=> navigate(AllUsers.getPath({})),
              },
            ]}
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default UserAddForm;
