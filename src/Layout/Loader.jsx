import React from "react";
import { Box, CircularProgress } from "@mui/material";

function Loader() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mt: 6,
      }}
    >
      <CircularProgress size={60} />
    </Box>
  );
}

export default Loader;
