import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
  Divider,
  Avatar,
  Typography,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import {
  AddShoppingCart,
  Home,
  Logout,
  ProductionQuantityLimits,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";

function Drawer({ isOpen, setPosition, setIsOpen }) {
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    )
      return;

    setPosition(anchor);
    setIsOpen(open);
  };

  const mockData = [
    {
      to: "/",
      text: "Home Page",
      icon: <Home />,
    },
    {
      to: "/products",
      text: "Products",
      icon: <ProductionQuantityLimits />,
    },
    {
      to: "/cart",
      text: "Cart",
      icon: <AddShoppingCart />,
    },
  ];

  const list = (anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Typography
        variant="h4"
        noWrap
        align="center"
        sx={{ mt: 2 }}
        gutterBottom
      >
        MUI
      </Typography>
      <Typography variant="body2" noWrap align="center" gutterBottom>
        E-commerce DDTocyh
      </Typography>
      <Divider />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "20px 0",
        }}
      >
        <Avatar
          sx={{ mr: 4 }}
          alt="Remy Sharp"
          src="https://images.pexels.com/photos/7166173/pexels-photo-7166173.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        />
        <Button sx={{ mr: 2 }} variant="outlined" endIcon={<Logout />}>
          Sign Out
        </Button>
      </Box>
      <Divider />
      <List>
        {mockData.map(({ text, icon, to }, index) => (
          <CustomLink key={text} to={to}>
            <ListItem sx={{ height: 50, paddingLeft: "16px" }} button>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          </CustomLink>
        ))}
      </List>
    </Box>
  );

  return (
    <React.Fragment>
      <SwipeableDrawer
        anchor="left"
        open={isOpen}
        onClose={toggleDrawer("left", false)}
        onOpen={toggleDrawer("left", true)}
      >
        {list("left")}
      </SwipeableDrawer>
    </React.Fragment>
  );
}

const CustomLink = styled(Link)({
  textDecoration: "none",
});

export default Drawer;
