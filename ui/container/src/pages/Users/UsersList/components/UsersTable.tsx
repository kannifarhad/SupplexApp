import { useEffect, memo, } from "react";
import { MUIDataTable } from "src/components/ThirdPart";
import { useAppDispatch } from "src/store";
import { getUsersList } from "src/store/users";
import { useSelector } from "react-redux";
import { selectUsersList } from "src/store/users";

const options = {
  filter: true,
  search: true,
  print: false,
  download: false,
  viewColumns: false,
  customToolbar: null,
  selectableRows: "none",
  filterType: "dropdown",
  responsive: "standard",
  className: "usersListTable",
  elevation: 0,
  rowsPerPage: 10,
  searchPlaceholder: "Type any information about user...",
  textLabels: {
    body: {
      noMatch: "Sorry we could not find any records!",
    },
    filter: {
      all: "All users list",
      title: "OUR FILTERS",
      reset: "PERFORM RESET",
    },
    selectedRows: {
      text: "rows has been selected",
      delete: "Delete Row",
      deleteAria: "Deleted Selected Rows",
    },
  },
};

const UsersTable = memo(({ columns }:{columns: any }) => {
  const dispatch = useAppDispatch();
  const { loading, usersList } = useSelector(selectUsersList);
    
  useEffect(() => {
    dispatch(getUsersList());
  }, [dispatch]);

  return (
    <MUIDataTable
      loading={loading}
      title={"All Users List"}
      data={usersList}
      columns={columns}
      options={options}
    />
  );
});

export default memo(UsersTable);
