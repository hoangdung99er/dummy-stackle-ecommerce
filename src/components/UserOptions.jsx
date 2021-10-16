import React from "react";
import { Box, SpeedDial, Avatar, SpeedDialAction } from "@mui/material";
import {
  Face,
  Dashboard,
  AccountCircle,
  FormatListNumberedRtl,
  Logout,
} from "@mui/icons-material";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { onLogoutAction } from "../store/actions/userActions";

function UserOptions() {
  const history = useHistory();
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const actions = [
    { icon: <AccountCircle />, name: "Profile", func: account },
    { icon: <FormatListNumberedRtl />, name: "Orders", func: orders },
    { icon: <Logout />, name: "Log Out", func: logoutUser },
  ];

  if (user?.role === "admin") {
    actions.splice(1, 0, {
      icon: <Dashboard />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  function dashboard() {
    history.push("/dashboard");
  }

  function orders() {
    history.push("/orders");
  }

  function account() {
    history.push("/account");
  }
  function logoutUser() {
    dispatch(onLogoutAction());
  }

  return (
    <React.Fragment>
      <Box
        sx={{
          position: "fixed",
          top: 50,
          right: 2,
          height: 320,
          transform: "translateZ(0px)",
          flexGrow: 1,
          zIndex: 100,
        }}
      >
        <SpeedDial
          ariaLabel="SpeedDial"
          sx={{ position: "absolute", bottom: 10, right: 10 }}
          icon={
            <Avatar
              sx={{ width: 56, height: 56 }}
              src={user.avatar.url ? user.avatar.url : <Face />}
              alt={user.avatar.url}
            />
          }
          direction="down"
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={action.func}
            />
          ))}
        </SpeedDial>
      </Box>
    </React.Fragment>
  );
}

export default UserOptions;
