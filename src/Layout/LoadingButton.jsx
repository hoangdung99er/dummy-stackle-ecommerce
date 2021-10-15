import React from "react";
import { Box, CircularProgress } from "@mui/material";

function LoadingButton() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress color="inherit" size={27} />
    </Box>
  );
}

export default LoadingButton;
