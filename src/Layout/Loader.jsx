import React from "react";
import { Box, CircularProgress } from "@mui/material";

function Loader({ fix }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mt: 6,
        height: fix && "55vh",
      }}
    >
      <CircularProgress size={60} />
    </Box>
  );
}

export default Loader;
