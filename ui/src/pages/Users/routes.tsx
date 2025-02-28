import { lazy } from "react";
import { SiteRoute } from "../../routes/types";
import { ButtonGroup } from "src/components/Elements";
import i18n from "src/translations";

const MAIN_PATH = "/users";
const ACCESS_MAIN_KEY = "usersManagement";

const userManagementAccessRules = {
  title: i18n.t("User Management")!,
  accessId: ACCESS_MAIN_KEY,
  description: i18n.t("List of the users in organization")!,
  accesses: {
    usersList: {
      accessId: `${ACCESS_MAIN_KEY}/usersList`,
      title: i18n.t("All Users List")!,
      description: i18n.t("Viewing the list of users in the organization")!,
    },
    editUser: {
      accessId: `${ACCESS_MAIN_KEY}/editUser`,
      title: i18n.t("Edit User Profile")!,
      description: i18n.t("Editing users information")!,
    },
    addUser: {
      accessId: `${ACCESS_MAIN_KEY}/addUser`,
      title: i18n.t("Add New User")!,
      description: i18n.t("Adding new users to the organization")!,
    },
    userGroupList: {
      accessId: `${ACCESS_MAIN_KEY}/userGroupsList`,
      title: i18n.t("User Groups"),
      description: i18n.t("Adding new users to the organization")!,
    },
    editUserGroup: {
      accessId: `${ACCESS_MAIN_KEY}/editUserGroups`,
      title: i18n.t("Edit User Group")!,
      description: i18n.t("Editing users information")!,
    },
    addUserGroup: {
      accessId: `${ACCESS_MAIN_KEY}/addUserGroups`,
      title: i18n.t("Add New User Group")!,
      description: i18n.t("Adding new user groups to the organization")!,
    },
  },
};

export const UserProfile = new SiteRoute({
  title: i18n.t("User Profile")!,
  path: "/profile",
  description: i18n.t("Your Profile where you can view or edit your information")!,
  component: lazy(() => import("./Profile")),
});

export const UserGroupsList = new SiteRoute<{}>({
  ...userManagementAccessRules.accesses.userGroupList,
  parentPath: MAIN_PATH,
  path: "/groups",
  iconName: "fa-user-group",
  component: lazy(() => import("./UserAdd")),
  toolbar: (
    <ButtonGroup
      buttonList={[
        {
          type: "button",
          title: i18n.t("All Users")!,
          color: "info",
          icon: <span className="fad fa-user-group" />,
          to: `${MAIN_PATH}/list`,
        },
        {
          type: "button",
          title: i18n.t("Add User Group")!,
          color: "green",
          icon: <span className="fad fa-user-plus" />,
          to: `${MAIN_PATH}/groups/add`,
        },
      ]}
    />
  ),
  showInMenu: true,
});

export const UserGroupsAdd = new SiteRoute<{}>({
  ...userManagementAccessRules.accesses.addUserGroup,
  parentPath: MAIN_PATH,
  path: "/groups/add",
  iconName: "fa-users-medical",
  component: lazy(() => import("./UserAdd")),
  toolbar: (
    <ButtonGroup
      buttonList={[
        {
          type: "button",
          title: i18n.t("All User Groups")!,
          color: "info",
          icon: <span className="fad fa-user-group" />,
          to: `${MAIN_PATH}/${UserGroupsList.path}`,
        },
      ]}
    />
  ),
  showInMenu: true,
});

export const UserGroupsEdit = new SiteRoute<{id: string}>({
  ...userManagementAccessRules.accesses.editUserGroup,
  parentPath: MAIN_PATH,
  path: "/groups/edit/:id",
  iconName: "fa-users-gear",
  component: lazy(() => import("./UserAdd")),
  toolbar: (
    <ButtonGroup
      buttonList={[
        {
          type: "button",
          title: i18n.t("All User Groups")!,
          color: "info",
          icon: <span className="fad fa-user-group" />,
          to: `${MAIN_PATH}/${UserGroupsList.path}`,
        },
        {
          type: "button",
          title: i18n.t("Add User Group")!,
          color: "green",
          icon: <span className="fad fa-user-plus" />,
          to: `${MAIN_PATH}${UserGroupsAdd.path}`,
        },
      ]}
    />
  ),
  showInMenu: true,
});

export const AddUser = new SiteRoute<{}>({
  ...userManagementAccessRules.accesses.addUser,
  parentPath: MAIN_PATH,
  path: "/add",
  iconName: "fa-user-plus",
  component: lazy(() => import("./UserAdd")),
  toolbar: (
    <ButtonGroup
      buttonList={[
        {
          type: "button",
          title: i18n.t("All Users")!,
          color: "info",
          icon: <span className="fad fa-users" />,
          to: `${MAIN_PATH}/list`,
        },
      ]}
    />
  ),
  showInMenu: true,
});

export const EditUser = new SiteRoute<{ id: string }>({
  ...userManagementAccessRules.accesses.editUser,
  parentPath: MAIN_PATH,
  iconName: "fa-user-edit",
  path: "/edit/:id",
  component: lazy(() => import("./UserEdit")),
  toolbar: (
    <ButtonGroup
      buttonList={[
        {
          type: "button",
          title: i18n.t("Add New User")!,
          color: "green",
          icon: <span className="fad fa-user-plus" />,
          to: `${MAIN_PATH}${AddUser.path}`,
        },
        {
          type: "button",
          title: i18n.t("All Users")!,
          color: "info",
          icon: <span className="fad fa-users" />,
          to: `${MAIN_PATH}/list`,
        },
      ]}
    />
  ),
  showInMenu: false,
});

export const AllUsers = new SiteRoute<{}>({
  ...userManagementAccessRules.accesses.usersList,
  parentPath: MAIN_PATH,
  iconName: "fa-users",
  path: "/list",
  component: lazy(() => import("./UsersList/index")),
  toolbar: (
    <ButtonGroup
      buttonList={[
        {
          type: "button",
          title: i18n.t("Add New User")!,
          color: "green",
          icon: <span className="fad fa-user-plus" />,
          to: `${MAIN_PATH}${AddUser.path}`,
        },
      ]}
    />
  ),
  showInMenu: true,
});

export const UserManagement = new SiteRoute({
  title: userManagementAccessRules.title,
  description: i18n.t("List of the users in organization")!,
  accessId: userManagementAccessRules.accessId,
  path: MAIN_PATH,
  // component: lazy(() => import("./UsersWrapper")),
  iconName: "fa-user",
  showInMenu: true,
  children: [AllUsers, EditUser, AddUser, UserGroupsList, UserGroupsAdd],
});

export default UserManagement;