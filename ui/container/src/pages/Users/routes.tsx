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
      title: "View Users List",
      description: "Viewing the list of users in the organization",
    },
    editUser: {
      accessId: `${ACCESS_MAIN_KEY}/editUser`,
      title: "Edit User Profile",
      description: "Editing users informations",
    },
    addUser: {
      accessId: `${ACCESS_MAIN_KEY}/addUser`,
      title: "Add new users",
      description: "Adding new users to the organization",
    },
  },
};

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
  children: [AllUsers, EditUser, AddUser],
});

export default UserManagement;
