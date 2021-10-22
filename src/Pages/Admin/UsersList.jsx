import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminSidebar from "../../Layout/AdminSidebar";
import MetaData from "../../Meta/MetaData";
import { Edit, Delete } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { Button, Box, Typography } from "@mui/material";
import { CLEAR_ISDELETED } from "../../store/constants/userConstant";
import { deleteUser, getAllUsers } from "../../store/actions/userActions";
import { CLEAR_USER_DETAILS_AFTER_UPDATE } from "../../store/constants/userConstant";
import { DataGrid } from "@mui/x-data-grid";
import CustomLoadingOverlay from "../../Layout/CustomLoadingOverlay";
import CustomNoRowsOverlay from "../../Layout/CustomNoRowOverlay";
import Alert from "../../Layout/Alert";
import SuccessAlert from "../../Layout/SuccessAlert";
import DeleteDialog from "../../components/DeleteDialog";

function UsersList() {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [userId, setUserId] = React.useState(null);

  const { users, loading } = useSelector((state) => state.allUsers);
  const { isDeleted } = useSelector((state) => state.handleUsers);

  const columns = [
    {
      field: "id",
      headerClassName: "super-app-theme--header",
      headerName: "User ID",
      minWidth: 180,
      flex: 0.8,
    },
    {
      field: "name",
      headerName: "Name",
      headerClassName: "super-app-theme--header",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      headerClassName: "super-app-theme--header",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "role",
      headerName: "Role",
      headerClassName: "super-app-theme--header",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      renderCell: (params) => {
        return (
          <React.Fragment>
            <Typography
              sx={{
                color: params.row.role === "admin" ? "green" : "red",
              }}
            >
              {params.row.role}
            </Typography>
          </React.Fragment>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      headerClassName: "super-app-theme--header",

      type: "number",
      minWidth: 150,
      flex: 0.3,
      sortable: false,
      renderCell: (params) => {
        return (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
              <Edit />
            </Link>
            <Button
              onClick={() => handleClickOpenDialog(params.row.id)}
              endIcon={<Delete />}
              variant="contained"
              color="error"
            >
              Delete
            </Button>
          </Box>
        );
      },
    },
  ];

  const handleClickOpenDialog = (id) => {
    setOpen(true);
    setUserId(id);
  };

  const handleClickDelete = () => {
    dispatch(deleteUser(userId));
  };

  const rows = users?.map((user) => {
    return {
      id: user._id,
      email: user.email,
      role: user.role,
      name: user.name,
    };
  });

  React.useEffect(() => {
    dispatch({ type: CLEAR_USER_DETAILS_AFTER_UPDATE });
  }, []);

  React.useEffect(() => {
    dispatch(getAllUsers());
    if (isDeleted) {
      setOpen(false);
      dispatch({ type: CLEAR_ISDELETED });
    }
  }, [isDeleted]);

  return (
    <React.Fragment>
      <Alert />
      <SuccessAlert />
      <MetaData title="Admin Users" />
      <AdminSidebar title="All Users">
        <Box
          sx={{
            bgcolor: "white",
            display: "flex",
            width: "100%",
            minHeight: "100vh",
            position: "relavtive",
            flexDirection: "column",
          }}
        >
          <Box
            component="div"
            sx={{
              "& .super-app-theme--header": {
                backgroundColor: "tomato",
                color: "common.white",
              },
            }}
          >
            <DataGrid
              components={{
                LoadingOverlay: CustomLoadingOverlay,
                NoRowsOverlay: CustomNoRowsOverlay,
              }}
              loading={loading ? true : false}
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              autoHeight
              getRowId={(row) => row.id}
              rowsPerPageOptions={[10, 20, 30]}
            />
            <DeleteDialog
              open={open}
              setOpen={setOpen}
              handleClickDelete={handleClickDelete}
              data={`user #${userId}`}
            />
          </Box>
        </Box>
      </AdminSidebar>
    </React.Fragment>
  );
}

export default UsersList;
