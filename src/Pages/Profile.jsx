import React from "react";
import MetaData from "../Meta/MetaData";
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography, Avatar, Button } from "@mui/material";
import { useHistory } from "react-router-dom";
import Loader from "../Layout/Loader";

function Profile() {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const history = useHistory();

  React.useEffect(() => {
    if (!isAuthenticated) {
      history.push("/login");
    }
  }, [isAuthenticated]);

  return (
    <React.Fragment>
      <Box
        sx={{
          bgcolor: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100vw",
          maxWidth: "100%",
          height: "100vh",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 20,
        }}
      >
        {loading ? (
          <Loader />
        ) : (
          <>
            <MetaData title={`${user?.name}'s Profile`} />
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: "center",
                height: "100%",
                p: { xs: 8, sm: 4 },
              }}
            >
              <Box
                sx={{
                  height: "80%",
                  width: { xs: "100%", sm: "50%" },
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
                component="div"
              >
                <Typography
                  noWrap
                  variant="h4"
                  sx={{ color: "lightslategray" }}
                >
                  My Profile
                </Typography>
                <Box sx={{ height: { xs: "75%", sm: "50%" }, mt: 6 }}>
                  <Avatar
                    sx={{ width: 300, height: 300 }}
                    src={user?.avatar?.url}
                    alt={user?.avatar?.url}
                  />
                </Box>
                <Button
                  size="small"
                  fullWidth
                  variant="contained"
                  onClick={() => history.push("/me/update")}
                  sx={{
                    width: "80%",
                    bgcolor: "orange",
                    "& .root:hover": {
                      bgcolor: "black",
                    },
                  }}
                >
                  Edit Profile
                </Button>
              </Box>
              <Box
                sx={{
                  height: "60%",
                  width: { xs: "100%", sm: "50%" },
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                }}
                component="div"
              >
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: { xs: "center", md: "flex-start" },
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Full Name
                  </Typography>
                  <Typography variant="body2" sx={{ color: "lightslategray" }}>
                    {user?.name}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: { xs: "center", md: "flex-start" },
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Email
                  </Typography>
                  <Typography variant="body2" sx={{ color: "lightslategray" }}>
                    {user?.email}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: { xs: "center", md: "flex-start" },
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Joined On
                  </Typography>
                  <Typography variant="body2" sx={{ color: "lightslategray" }}>
                    {new Date(user?.createdAt).toLocaleDateString("VN-vi")}
                  </Typography>
                </Box>
                <Button
                  size="small"
                  fullWidth
                  variant="contained"
                  sx={{
                    width: "80%",
                    bgcolor: "black",
                    mb: 3,
                  }}
                  onClick={() => history.push("/me/update")}
                >
                  My Orders
                </Button>
                <Button
                  size="small"
                  fullWidth
                  variant="contained"
                  sx={{
                    width: "80%",
                    bgcolor: "black",
                  }}
                  onClick={() => history.push("/password/update")}
                >
                  Change Password
                </Button>
              </Box>
            </Box>
          </>
        )}
      </Box>
    </React.Fragment>
  );
}

export default Profile;
