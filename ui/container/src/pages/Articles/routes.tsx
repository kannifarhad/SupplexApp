import { lazy } from "react";
import { SiteRoute } from "../../routes/types";

const MAIN_PATH = '/articles';
const ACCESS_MAIN_KEY = 'articles';

const articleManagementAccessRules = {
    title:'Articles',
    accessId:ACCESS_MAIN_KEY,
    description: "List of the articles",
    accesses: {
        articlesList: {
            accessId:`${ACCESS_MAIN_KEY}/articleList`,
            title:"View a List",
            description: "Viewing the list of articles in the organization",
        },
        editArticle:{
            accessId:`${ACCESS_MAIN_KEY}/editArticle`,
            title:"Edit Article",
            description: "Editing articles informations",
        },
        addArticle:{
            accessId:`${ACCESS_MAIN_KEY}/addArticle`,
            title:"Add new articles",
            description: "Adding new articles to the blog",
        }
    }
}

export const EditArticle = new SiteRoute<{id :string}>({
    ...articleManagementAccessRules.accesses.editArticle,
    parentPath:MAIN_PATH,
    path: "/:id",
    component: lazy(() => import("./ArticleAdd")),
    exact: true,
    showInMenu:true,
});

export const AddArticle = new SiteRoute<{id :string}>({
    ...articleManagementAccessRules.accesses.addArticle,
    parentPath:MAIN_PATH,
    path: "/add",
    component: lazy(() => import("./ArticleAdd")),
    showInMenu:true,
    exact: true,
});

export const AllArticles = new SiteRoute<{id :string}>({
    ...articleManagementAccessRules.accesses.articlesList,
    parentPath: MAIN_PATH,
    path: "/list",
    component: lazy(() => import("./ArticleList")),
    showInMenu:true,
    exact: true,
});

export const ArticleManagement = new SiteRoute({
    title: articleManagementAccessRules.title,
    description: "List of the articles in organization",
    accessId: articleManagementAccessRules.accessId,
    path: MAIN_PATH,
    // component: lazy(() => import("./ArticlesWrapper")),
    exact: true,
    iconName:'fa-feather',
    showInMenu: true,
    children:[
        AllArticles,
        EditArticle,
        AddArticle,
    ]
});

export default ArticleManagement