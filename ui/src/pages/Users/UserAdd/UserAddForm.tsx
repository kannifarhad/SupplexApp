import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Paper } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AllUsers } from "../routes";
import { addUserSchema, AddUserType } from "../fromSchemas";
import AvatarEdit from "../components/AvatarEdit";
import {
  DatePicker,
  InputField,
  PasswordField,
  SelectWithSearch,
  SimpleSelect,
  ButtonGroup,
  BlockBox,
} from "src/components/Elements";


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
  } = useForm<AddUserType>({
    resolver: yupResolver(addUserSchema),
    defaultValues: {
      mail: "",
      status: "",
      password: "",
      about: "",
      passwordRepeat: "",
      image: "https://pics.craiyon.com/2024-04-14/qV9PTsjxQpaOdO-4uA-0vg.webp",
      phone: "",
      address: "",
      profession: "",
      createdAt: new Date(),
      groupId: 0,
    },
  });

  const onSubmit = (data: AddUserType) => {
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
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <BlockBox
            title="Main Information"
            subtitle="The required fields must be filled."
            icon={<span className="fad fa-id-badge" />}
          >
            <Grid container spacing={2} style={{ padding: "20px" }}>
              <Grid item xs={6}>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <InputField
                      {...field}
                      label="Full name"
                      error={!!errors.name}
                      helperText={errors.name?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={6}>
                <Controller
                  name="login"
                  control={control}
                  render={({ field }) => (
                    <InputField
                      {...field}
                      label="E-mail"
                      error={!!errors.login}
                      helperText={
                        errors.login?.message ||
                        "This would be used as login as well"
                      }
                    />
                  )}
                />
              </Grid>

              <Grid item xs={4}>
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <InputField
                      {...field}
                      label="Phone"
                      error={!!errors.phone}
                      helperText={errors.phone?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={8}>
                <Controller
                  name="address"
                  control={control}
                  render={({ field }) => (
                    <InputField
                      {...field}
                      label="Address"
                      error={!!errors.address}
                      helperText={errors.address?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item>
                <Controller
                  name="image"
                  control={control}
                  render={({ field }) => (
                    <AvatarEdit 
                      src={field.value}
                      size={105}
                      onChange={field.onChange}
                    />
                  )}
                />
              </Grid>

              <Grid item flexGrow={1}>
                <Controller
                  name="about"
                  control={control}
                  render={({ field }) => (
                    <InputField
                      {...field}
                      label="About"
                      rows={4}
                      multiline
                      error={!!errors.about}
                      helperText={errors.about?.message}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </BlockBox>
        </Grid>

        <Grid item xs={6}>
          <BlockBox
            title="Access & Roles"
            subtitle="The required fields must be filled."
            icon={<span className="fad fa-key" />}
          >
            <Grid container spacing={2} style={{ padding: "20px" }}>
              <Grid item xs={4}>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <SimpleSelect
                      {...field}
                      items={[
                        {
                          value: "1",
                          title: "Active",
                        },
                        {
                          value: "0",
                          title: "Deactive",
                        },
                      ]}
                      label="Status"
                      helperText={errors.status?.message}
                      error={!!errors.status}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="role"
                  control={control}
                  render={({ field }) => (
                    <SimpleSelect
                      {...field}
                      items={[
                        {
                          value: "ADMIN",
                          title: "Admin",
                        },
                        {
                          value: "CONSUMER",
                          title: "Consumer",
                        },
                      ]}
                      label="Role"
                      helperText={
                        errors.role?.message ||
                        "Depending on role additional data may be required"
                      }
                      error={!!errors.role}
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
                      helperText={
                        errors.groupId?.message ||
                        "This would help define access to the system modules"
                      }
                      error={!!errors.groupId}
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
                      label="Password"
                      error={!!errors.password}
                      helperText={
                        errors.password?.message ||
                        "Should be at least 8 symbols"
                      }
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
                      label="Repeat Password"
                      error={!!errors.passwordRepeat}
                      helperText={errors.passwordRepeat?.message}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </BlockBox>
        </Grid>

        <Grid item xs={12}>
          <Paper style={{ padding: "10px" }} elevation={0}>
            <ButtonGroup
              buttonList={[
                {
                  type: "submit",
                  variant: "contained",
                  title: "Save and Quit",
                  loading: false,
                  color: "green",
                  icon: <span className="fa fa-save" />,
                  onClick: handleSubmit(onSubmit),
                },
                {
                  type: "reset",
                  title: "Cancel",
                  variant: "contained",
                  color: "yellow",
                  icon: <span className="fa fa-cancel" />,
                  onClick: () => navigate(AllUsers.getPath({})),
                },
              ]}
            />
          </Paper>
        </Grid>
      </Grid>
    </form>
  );
};

export default UserAddForm;
