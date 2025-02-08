import React, { useState, useEffect, memo } from "react";
import {
  Fab,
  Chip,
  Tooltip,
  Typography,
  FormLabel,
  Avatar,
  Grid,
} from "@mui/material";
import { MUIDataTable } from "../../../components/ThirdPart";
import { DatePicker } from "src/components/Elements";
// import { useNavigate } from "react-router-dom";

// import ButtonList from "../../Components/Elements/FormElements/ButtonList";
// import UserButtons from "../../Data/Buttons/UserButtons";
// import DatePicker from "../../Components/Elements/FormElements/DatePicker";
// import { getUsersList } from "../../Redux/actions";

function UsersList() {
  //   const navigate = useNavigate();
  const historyClick = (link) => {
    // navigate(link);
  };

  const handleClose = () => {
    setPopup({
      ...popupData,
      open: false,
    });
  };

  const handleSubmit = () => {
    setPopup({
      ...popupData,
      open: false,
    });
  };

  const [popupData, setPopup] = React.useState({
    open: false,
    title: "",
    id: "",
    handleClose,
    type: "cancel-1",
    description:
      "Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.",
    handleSubmit,
  });

  const columns = [
    {
      name: "id",
      label: "Id",
      options: {
        filter: false,
        sort: false,
        setCellHeaderProps: (value) => {
          return {
            style: {
              width: 40,
              paddingLeft: "30px",
            },
          };
        },
        setCellProps: (value) => {
          return {
            style: {
              paddingLeft: "30px",
            },
          };
        },
      },
    },
    {
      name: "image",
      label: "Photo",
      options: {
        filter: false,
        display: "excluded",
      },
    },
    {
      name: "name",
      label: "User Name",
      options: {
        filter: true,
        customFilterListOptions: { render: (v) => `User Name: ${v}` },
        filterType: "textField",
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Chip
              variant="outlined"
              className="userAvator"
              size="medium"
              label={value}
              avatar={<Avatar src={tableMeta.rowData[1]} />}
            />
          );
        },
      },
    },
    {
      name: "login",
      label: "Login of user",
      options: {
        filter: true,
        customFilterListOptions: { render: (v) => `User Login: ${v}` },
        filterType: "textField",
      },
    },
    {
      name: "userGroup.title",
      label: "User Group",
      options: {
        filter: true,
        customFilterListOptions: { render: (v) => `User Group: ${v}` },
      },
    },
    {
      name: "phone",
      label: "Phone Number",
      options: {
        filter: true,
        customFilterListOptions: { render: (v) => `User Phone: ${v}` },
        filterType: "textField",
      },
    },
    {
      name: "status",
      label: "Status",
      options: {
        filter: true,
        customBodyRender: (value) => {
          return value === 1 ? "Active" : "Blocked";
        },
      },
    },
    {
      name: "createdAt",
      label: "Registration",
      options: {
        filter: true,
        sort: true,
        sortDirection: "desc",
        customBodyRender: (value) => {
          var createDate = new Date(value);
          return createDate.toLocaleDateString("en-GB");
        },
        setCellProps: (value) => {
          return {
            style: {
              width: 150,
            },
          };
        },
        filterType: "custom",
        customFilterListOptions: {
          render: (v) => {
            if (v[0] && v[1]) {
              return `Start Date: ${v[0].toLocaleDateString(
                "en-GB"
              )}, End Date: ${v[1].toLocaleDateString("en-GB")}`;
            } else if (v[0]) {
              return `Start Date: ${v[0].toLocaleDateString("en-GB")}`;
            } else if (v[1]) {
              return `End Date: ${v[1].toLocaleDateString("en-GB")}`;
            }
            return false;
          },
        },
        filterOptions: {
          names: [],
          logic(date, filters) {
            var check = new Date(date);
            var from: any = new Date(filters[0]);
            var to: any = new Date(filters[1]);
            from.setDate(from.getDate() + 1);
            to.setDate(to.getDate() + 1);
            from = new Date(from).setHours(0, 0, 0, 0);
            to = new Date(to).setHours(23, 59, 59, 59);

            if (filters[0] && filters[1] && check >= to && check <= from) {
              return true;
            } else if (filters[0] && check >= to) {
              return true;
            } else if (filters[1] && check <= from) {
              return true;
            }
            return false;
          },
          display: (filterList, onChange, index, column) => (
            <div>
              <FormLabel>Date</FormLabel>
              <div
                className="container"
                style={{ padding: "0px 10px 0px 10px" }}
              >
                <div className="row">
                  <div className="col-md-6">
                    <DatePicker
                      id="startDate"
                      label="Start Date"
                      //   InputLabelProps={{
                      //     shrink: true,
                      //   }}
                      value={filterList[index][0] || ""}
                      onChange={(value) => {
                        filterList[index][0] = value;
                        onChange(filterList[index], index, column);
                      }}
                    />
                  </div>
                  <div className="col-md-6">
                    <DatePicker
                      id="endDate"
                      value={filterList[index][1] || ""}
                      onChange={(value) => {
                        filterList[index][1] = value;
                        onChange(filterList[index], index, column);
                      }}
                      label="End Date"
                    />
                  </div>
                </div>
              </div>
            </div>
          ),
        },
        print: false,
      },
    },
    {
      name: "Actions",
      options: {
        filter: false,
        sort: false,
        empty: true,
        setCellHeaderProps: (value) => {
          return {
            style: {
              width: 150,
            },
          };
        },
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Typography component={"span"} noWrap={true}>
              <Tooltip title="View User Info" aria-label="edit">
                <Fab
                  size="small"
                  style={{ marginRight: "10px" }}
                  className={`cubeFab`}
                  onClick={() =>
                    historyClick(`/user/info/${tableMeta.rowData[0]}`)
                  }
                >
                  <span className={"icon-view blueText"}> </span>
                </Fab>
              </Tooltip>

              <Tooltip title="Delete" aria-label="delete">
                <Fab
                  size="small"
                  style={{ marginRight: "10px" }}
                  className={`cubeFab`}
                  onClick={() =>
                    handleClickPopupOpen(
                      "Seçilmiş istifadəçi silinsin?",
                      tableMeta.rowData[0]
                    )
                  }
                >
                  <span className={"icon-trash redText"}> </span>
                </Fab>
              </Tooltip>

              <Tooltip title="Block" aria-label="delete">
                <Fab
                  size="small"
                  style={{ marginRight: "10px" }}
                  className={`cubeFab`}
                  onClick={() =>
                    handleClickPopupOpen(
                      "Seçilmiş istifadəçi bloklansın?",
                      tableMeta.rowData[0]
                    )
                  }
                >
                  <span className={"icon-ban yellowText"}> </span>
                </Fab>
              </Tooltip>

              <Tooltip title="Edit" aria-label="edit">
                <Fab
                  size="small"
                  style={{ marginRight: "10px" }}
                  className={`cubeFab`}
                  onClick={() =>
                    historyClick(`/user/edit/${tableMeta.rowData[0]}`)
                  }
                >
                  <span className={"icon-pencil greenText"}> </span>
                </Fab>
              </Tooltip>
            </Typography>
          );
        },
      },
    },
  ];

  const options = {
    filter: true,
    search: true,
    print: false,
    download: false,
    viewColumns: false,
    customToolbar: null,
    selectableRows: "none",
    filterType: "dropdown",
    responsive: "stacked",
    rowsPerPage: 15,
    searchPlaceholder: "Type any information about user...",
    textLabels: {
      body: {
        noMatch: "Sorry we could not find any records!",
      },
      filter: {
        all: "All Records",
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

  const handleClickPopupOpen = (title, id) => {
    setPopup({
      ...popupData,
      open: true,
      title,
      id,
    });
  };

  //   useEffect(() => {
  //     props.getUsersList();
  //   }, []);
  console.log("RERENDER");
  return (
    <Grid>
      <Grid item xs={12}>
        <div className="col-xl-12 marginBottom-20">
          {/* <ButtonList buttons={UserButtons.usersList} /> */}
        </div>
      </Grid>
      <Grid item xs={12} className="whiteBlock">
        <MUIDataTable
          title={"All Users List"}
          data={[]}
          columns={columns}
          options={options}
        />
      </Grid>
    </Grid>
  );
}

export default memo(UsersList);
