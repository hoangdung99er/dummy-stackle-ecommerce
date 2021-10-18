import React from "react";
import { Box, SpeedDial, Avatar, SpeedDialAction } from "@mui/material";
import {
  Face,
  Dashboard,
  AccountCircle,
  FormatListNumberedRtl,
  Logout,
  ShoppingBag,
} from "@mui/icons-material";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { onLogoutAction } from "../store/actions/userActions";

function UserOptions() {
  const history = useHistory();
  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const [innerWidth, setInnerWidth] = React.useState(0);
  const dispatch = useDispatch();

  const actions = [
    { icon: <AccountCircle />, name: "Profile", func: account },
    { icon: <FormatListNumberedRtl />, name: "Orders", func: orders },
    {
      icon: (
        <ShoppingBag
          sx={{ color: cartItems?.length > 0 ? "tomato" : "unset" }}
        />
      ),
      name: `Cart (${cartItems?.length || 0})`,
      func: cart,
    },
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

  function cart() {
    history.push("/cart");
  }

  React.useEffect(() => {
    const updateSize = () => {
      setInnerWidth(window.innerWidth);
    };
    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <React.Fragment>
      <Box
        sx={{
          position: "fixed",
          top: 60,
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
              tooltipOpen={innerWidth <= 600 ? true : false}
            />
          ))}
        </SpeedDial>
      </Box>
    </React.Fragment>
  );
}

export default UserOptions;
