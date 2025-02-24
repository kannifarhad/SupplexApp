import { lazy } from "react";
import { SiteRoute } from "../../routes/types";
import { ButtonGroup } from "src/components/Elements";

const MAIN_PATH = "/users";
const ACCESS_MAIN_KEY = "usersManagement";

const userManagementAccessRules = {
  title: "User Managment",
  accessId: ACCESS_MAIN_KEY,
  description: "List of the users in organization",
  accesses: {
    usersList: {
      accessId: `${ACCESS_MAIN_KEY}/usersList`,
      title: "All Users List",
      description: "Viewing the list of users in the organization",
    },
    editUser: {
      accessId: `${ACCESS_MAIN_KEY}/editUser`,
      title: "Edit User Profile",
      description: "Editing users informations",
    },
    addUser: {
      accessId: `${ACCESS_MAIN_KEY}/addUser`,
      title: "Add New User",
      description: "Adding new users to the organization",
    },
    userGroupList: {
      accessId: `${ACCESS_MAIN_KEY}/userGroupsList`,
      title: "User Groups",
      description: "Adding new users to the organization",
    },
    editUserGroup: {
      accessId: `${ACCESS_MAIN_KEY}/editUserGroups`,
      title: "Edit User Group",
      description: "Editing users informations",
    },
    addUserGroup: {
      accessId: `${ACCESS_MAIN_KEY}/addUserGroups`,
      title: "Add New User Group",
      description: "Adding new users groups to the organization",
    },
  },
};

export const UserProfile = new SiteRoute({
  title: "User Profile",
  path: "/profile",
  description: "Your Profile where you can view or edit your information",
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
          title: "All Users",
          color: "info",
          icon: <span className="fad fa-user-group" />,
          to: `${MAIN_PATH}/list`,
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
          title: "All Users",
          color: "info",
          icon: <span className="fad fa-user-group" />,
          to: `${MAIN_PATH}/list`,
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
          title: "All Users",
          color: "info",
          icon: <span className="fad fa-user-group" />,
          to: `${MAIN_PATH}/list`,
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
          title: "All Users",
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
          title: "Add New User",
          color: "green",
          icon: <span className="fad fa-user-plus" />,
          to: `${MAIN_PATH}${AddUser.path}`,
        },
        {
          type: "button",
          title: "All Users",
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
          title: "Add New User",
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
  description: "List of the users in organization",
  accessId: userManagementAccessRules.accessId,
  path: MAIN_PATH,
  // component: lazy(() => import("./UsersWrapper")),
  iconName: "fa-user",
  showInMenu: true,
  children: [AllUsers, EditUser, AddUser, UserGroupsList, UserGroupsAdd],
});

export default UserManagement;
