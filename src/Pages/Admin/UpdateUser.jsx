import React from "react";
import AdminSidebar from "../../Layout/AdminSidebar";
import {
  Box,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Button,
  MenuItem,
  Select,
} from "@mui/material";
import { Person, AlternateEmail, Mood } from "@mui/icons-material";
import { useHistory, useParams } from "react-router-dom";
import MetaData from "../../Meta/MetaData";
import { useSelector, useDispatch } from "react-redux";
import { onUpdateUser, getSingleUser } from "../../store/actions/userActions";
import LoadingButton from "../../Layout/LoadingButton";
import Alert from "../../Layout/Alert";
import SuccessAlert from "../../Layout/SuccessAlert";
import { CLEAR_ISUPDATED } from "../../store/constants/userConstant";

function UpdateUser() {
  const dispatch = useDispatch();
  const { loading, isUpdated } = useSelector((state) => state.handleUsers);
  const { user, loading: loadingUser } = useSelector(
    (state) => state.userDetails
  );

  const history = useHistory();
  const userId = useParams().id;

  const [values, setValues] = React.useState({
    role: "",
  });

  const { role } = values;

  const handleChangeValues = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const userData = {
      role,
    };

    dispatch(onUpdateUser(userId, userData));
  };

  React.useEffect(() => {
    if (user && user._id !== userId) {
      dispatch(getSingleUser(userId));
    } else {
      setValues({
        ...values,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    }

    if (isUpdated) {
      history.push("/admin/users");
      dispatch({ type: CLEAR_ISUPDATED });
    }
  }, [isUpdated, user, userId, dispatch, history]);

  return (
    <React.Fragment>
      <Alert />
      <SuccessAlert />
      <MetaData title={`Update User ${userId}`} />
      <AdminSidebar title="Update User">
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
          <Box component="div" sx={{ width: "80%", margin: "0 auto" }}>
            <form onSubmit={updateUserSubmitHandler}>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-name">
                  User Name
                </InputLabel>
                <OutlinedInput
                  startAdornment={
                    <InputAdornment position="start">
                      <Person />
                    </InputAdornment>
                  }
                  id="outlined-adornment-name"
                  type="text"
                  readOnly
                  defaultValue={values.name}
                  // onChange={handleChangeValues("name")}
                  label="User name"
                />
              </FormControl>
              <FormControl sx={{ mt: 4 }} fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-email">
                  E-mail
                </InputLabel>
                <OutlinedInput
                  startAdornment={
                    <InputAdornment position="start">
                      <AlternateEmail />
                    </InputAdornment>
                  }
                  id="outlined-adornment-email"
                  type="email"
                  defaultValue={values.email}
                  readOnly
                  // onChange={handleChangeValues("email")}
                  label="E-mail"
                />
              </FormControl>

              <FormControl sx={{ mt: 4 }} fullWidth variant="outlined">
                <InputLabel htmlFor="category-select-role">Role</InputLabel>
                <Select
                  labelId="category-select-role"
                  id="category-select"
                  value={values.role}
                  label="Role"
                  startAdornment={
                    <InputAdornment position="start">
                      <Mood />
                    </InputAdornment>
                  }
                  onChange={handleChangeValues("role")}
                >
                  <MenuItem value="">Choose Role</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="user">User</MenuItem>
                </Select>
              </FormControl>
              <Button
                sx={{ mt: 2 }}
                size="large"
                variant="contained"
                fullWidth
                type="submit"
                color="primary"
                disabled={
                  loading ? true : false || values.role === "" ? true : false
                }
              >
                {loading ? <LoadingButton /> : "UPDATE"}
              </Button>
            </form>
          </Box>
        </Box>
      </AdminSidebar>
    </React.Fragment>
  );
}

export default UpdateUser;
