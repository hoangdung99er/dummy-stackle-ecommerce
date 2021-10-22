import React from "react";
import { GridOverlay } from "@mui/x-data-grid";
import { LinearProgress } from "@mui/material";

function CustomLoadingOverlay() {
  return (
    <GridOverlay>
      <div style={{ position: "absolute", top: 0, width: "100%" }}>
        <LinearProgress />
      </div>
    </GridOverlay>
  );
}

export default CustomLoadingOverlay;
