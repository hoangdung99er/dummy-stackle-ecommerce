import * as React from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
} from "@mui/material";
import {
  LocalShipping,
  LibraryAddCheck,
  AccountBalance,
} from "@mui/icons-material";

const steps = [
  {
    label: <Typography>Shipping Details</Typography>,
    icon: <LocalShipping />,
  },
  {
    label: <Typography>Confirm Order</Typography>,
    icon: <LibraryAddCheck />,
  },
  {
    label: <Typography>Payment</Typography>,
    icon: <AccountBalance />,
  },
];

export default function HorizontalLinearStepper({ activeStep }) {
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper
        alternativeLabel
        sx={{ boxSizing: "border-box" }}
        activeStep={activeStep}
      >
        {steps.map((item, index) => (
          <Step
            key={index}
            completed={activeStep >= index ? true : false}
            active={activeStep === index ? true : false}
          >
            <StepLabel
              sx={{
                color: activeStep >= index ? "tomato" : "rgba(0,0,0,0.649)",
              }}
              icon={item.icon}
            >
              {item.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
