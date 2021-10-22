import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import {
  ListItemText,
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Divider,
  Typography,
  ListItem,
  ListItemIcon,
  Collapse,
  ListItemButton,
} from "@mui/material";
import {
  Dashboard,
  Assessment,
  PeopleAlt,
  RateReview,
  AddShoppingCart,
  ExpandLess,
  ExpandMore,
  AddBox,
  AllInbox,
} from "@mui/icons-material";
import { useHistory } from "react-router-dom";

const drawerWidth = 240;

function CustomizedCollapse({ open, productDropDownItem, ...rest }) {
  return (
    <Collapse in={open} {...rest}>
      {productDropDownItem.map(({ text, icon, handleClick }) => (
        <List key={text} component="div" disablePadding>
          <ListItemButton onClick={handleClick} sx={{ pl: 4 }}>
            <ListItem>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          </ListItemButton>
        </List>
      ))}
    </Collapse>
  );
}

function AdminSidebar({ children, title }) {
  const [open, setOpen] = React.useState(false);
  const [widthInnit, setWidthInnit] = React.useState(window.innerWidth);

  const history = useHistory();

  const productDropDownItem = [
    {
      icon: <AllInbox />,
      text: "All",
      handleClick: () => history.push("/admin/products"),
    },
    {
      icon: <AddBox />,
      handleClick: () => history.push("/admin/product/new"),
      text: "Create Product",
    },
  ];

  const handleClick = () => {
    if (widthInnit <= 600) setOpen(true);
    setOpen((prev) => !prev);
  };

  const menus = [
    {
      text: "Dashboard",
      icon: <Dashboard />,
      handleClickToggle: () => history.push("/admin/dashboard"),
    },
    {
      text: "Products",
      icon: <AddShoppingCart />,
      expand: open ? <ExpandLess /> : <ExpandMore />,
      collapse: (
        <CustomizedCollapse
          productDropDownItem={productDropDownItem}
          open={open}
        />
      ),
      handleClickToggle: handleClick,
    },
    {
      text: "Orders",
      icon: <Assessment />,
      handleClickToggle: () => history.push("/admin/orders"),
    },
    {
      text: "Users",
      icon: <PeopleAlt />,
      handleClickToggle: () => history.push("/admin/users"),
    },
    {
      text: "Reviews",
      icon: <RateReview />,
      handleClickToggle: () => history.push("/admin/reviews"),
    },
  ];

  React.useEffect(() => {
    const updateSize = () => {
      setWidthInnit(window.innerWidth);
    };

    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: {
            xs: `calc(100% - 51px)`,
            sm: `calc(100% - ${drawerWidth}px)`,
          },
          ml: `${drawerWidth}px`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: { xs: 51, sm: drawerWidth },
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: { xs: 51, sm: drawerWidth },
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        {widthInnit > 600 && (
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              MUI ADMIN PANEL
            </Typography>
          </Toolbar>
        )}
        <Divider />
        <List>
          {menus.map(
            (
              { text, icon, expand, collapse, handleClickToggle, handleClick },
              index
            ) => (
              <React.Fragment key={index}>
                <ListItem onClick={handleClickToggle} button>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={text} />
                  {expand}
                </ListItem>
                {collapse}
              </React.Fragment>
            )
          )}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", pt: 3 }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}

export default AdminSidebar;
