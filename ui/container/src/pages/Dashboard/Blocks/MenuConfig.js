const menu = {
  aside: {
    self: {},
    items: [
      {
        title: 'Dashboard',
        icon: 'fad fa-home',
        page: '',
      },
      {
        title: 'Configurations',
        icon: 'fad fa-tools',
        page: 'configurations',
      },
      {
        title: 'Page System',
        icon: 'fad fa-newspaper',
        submenu: [
          {
            title: 'Add New Post',
            page: 'posts/add',
          },
          {
            title: 'All Posts',
            page: 'posts/list',
          },
          {
            title: 'Categories',
            page: 'posts/categories',
          },
          {
            title: 'Page Designs',
            page: 'posts/designs',
          },
          {
            title: 'Extrafields',
            page: 'posts/extrafields',
          },
        ],
      },
      {
        title: 'User System',
        icon: 'fad fa-user',
        submenu: [
          {
            title: 'Add New User',
            page: 'user/add',
          },
          {
            title: 'All Users List',
            page: 'user/list',
          },
          {
            title: 'User Groups',
            page: 'user/groups',
          },
          {
            title: 'Import Users/Contacts',
            page: 'user/import',
          },
        ],
      },
      {
        title: 'HRM',
        icon: 'fad fa-clipboard-user',
        submenu: [
          {
            title: 'Employer Contracts',
            page: 'employer/contract',
          },
          {
            title: 'Vacations',
            page: 'employer/vacation',
          },
          {
            title: 'Recuirtment',
            page: 'user/list',
          },
        ],
      },
      {
        title: 'Customers / CRM',
        icon: 'fad fa-users-crown',
        submenu: [
          {
            title: 'Customers List',
            page: 'customers/contract',
          },
          {
            title: 'Contacts',
            page: 'customers/vacation',
          },
          {
            title: 'Tickets',
            page: 'customers/vacation',
          },
        ],
      },
      {
        title: 'Sales & Expenses',
        icon: 'fad fa-money-check-alt',
        submenu: [
          {
            title: 'Payments',
            page: 'sales/payments',
          },
          {
            title: 'Invoices',
            page: 'sales/invoices',
          },
          {
            title: 'Expenses',
            page: 'sales/expences',
          },
        ],
      },

      {
        title: 'Store & Services',
        icon: 'fad fa-bags-shopping',
        submenu: [
          {
            title: 'Products',
            page: 'store/contract',
          },
          {
            title: 'Services',
            page: 'store/vacation',
          },
        ],
      },
      {
        title: 'Reports',
        icon: 'fad fa-analytics',
        submenu: [
          {
            title: 'Sales',
            page: 'reports/contract',
          },
          {
            title: 'Expenses Vs Income',
            page: 'reports/vacation',
          },
          {
            title: 'System requests logs',
            page: 'reports/vacation',
          },
        ],
      },
      {
        title: 'E-mail',
        icon: 'fad fa-mailbox',
        page: 'menu',
      },
      {
        title: 'Projects / Tasks Managment',
        icon: 'fad fa-tasks',
        page: 'tasks/projects',
      },
      {
        title: 'Languages',
        icon: 'fad fa-globe-americas',
        page: 'languages',
      },
      {
        title: 'File Manager',
        icon: 'fad fa-folder',
        page: 'filemanager',
      },
    ],
  },
};
export default menu;