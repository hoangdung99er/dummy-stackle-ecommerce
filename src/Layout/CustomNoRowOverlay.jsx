import React from "react";
import { Typography } from "@mui/material";
import { GridOverlay } from "@mui/x-data-grid";

function CustomNoRowOverlay() {
  return (
    <GridOverlay
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Typography variant="body2" sx={{ fontWeight: 600 }}>
        No Rows
      </Typography>
    </GridOverlay>
  );
}

export default CustomNoRowOverlay;
