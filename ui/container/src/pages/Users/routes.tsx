import { lazy } from "react";
import { SiteRoute } from "../../routes/types";

const MAIN_PATH = '/users';
const ACCESS_MAIN_KEY = 'usersManagement';

const userManagementAccessRules = {
    title:'User Managment',
    accessId:ACCESS_MAIN_KEY,
    description: "List of the users in organization",
    accesses: {
        editUser:{
            accessId:`${ACCESS_MAIN_KEY}/editUser`,
            title:"Edit User Profile",
            description: "Editing users informations",
        },
        addUser:{
            accessId:`${ACCESS_MAIN_KEY}/addUser`,
            title:"Add new users",
            description: "Adding new users to the organization",
        }
    }
}

export const EditUser = new SiteRoute<{id :string}>({
    ...userManagementAccessRules.accesses.editUser,
    parentPath:MAIN_PATH,
    path: "/:id",
    component: lazy(() => import("../Dashboard/Dump")),
    exact: true,
    showInMenu:true,
});

export const AddUser = new SiteRoute<{id :string}>({
    ...userManagementAccessRules.accesses.addUser,
    parentPath:MAIN_PATH,
    path: "/add",
    component: lazy(() => import("../Dashboard/Dump")),
    showInMenu:true,
    exact: true,
});

export const UserManagement = new SiteRoute({
    title: userManagementAccessRules.title,
    description: "List of the users in organization",
    accessId:userManagementAccessRules.accessId,
    path: MAIN_PATH,
    component: lazy(() => import("../Dashboard/Dump")),
    iconName:'fa-user',
    exact: true,
    showInMenu:true,
    children:[
        EditUser,
        AddUser
    ]
});

export default UserManagement