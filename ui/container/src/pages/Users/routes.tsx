import { lazy } from "react";
import { SiteRoute } from "../../routes/types";

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

export const EditUser = new SiteRoute<{ id: string }>({
  ...userManagementAccessRules.accesses.editUser,
  parentPath: MAIN_PATH,
  path: "/edit/:id",
  component: lazy(() => import("./UserEdit")),
  showInMenu: false,
});

export const AddUser = new SiteRoute<{ id: string }>({
  ...userManagementAccessRules.accesses.addUser,
  parentPath: MAIN_PATH,
  path: "/add",
  component: lazy(() => import("./UserAdd")),
  showInMenu: true,
});

export const AllUsers = new SiteRoute<{ id: string }>({
  ...userManagementAccessRules.accesses.usersList,
  parentPath: MAIN_PATH,
  path: "/list",
  component: lazy(() => import("./UsersList")),
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
