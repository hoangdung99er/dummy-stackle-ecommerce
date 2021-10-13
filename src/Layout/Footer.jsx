import React from "react";
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  IconButton,
  Stack,
  Box,
} from "@mui/material";
import { GitHub, LinkedIn, Facebook } from "@mui/icons-material";
export default function Footer() {
  return (
    <AppBar sx={{ background: "#919292ac", mt: 10 }} position="static">
      <Container maxWidth="xl">
        <Toolbar
          sx={{
            display: "flex",
            alignItems: { xs: "space-between", sm: "center" },
            justifyContent: "space-between",
            padding: 2,
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600 }} color="inherit">
            DOWNLOAD THE APP
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography gutterBottom variant="h4" color="error">
              Stackle E-Commerce
            </Typography>
            <Typography variant="body2" color="inherit">
              @ 2021 Hoang Dung
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, textDecoration: "underline" }}
              color="inherit"
            >
              Follow Us
            </Typography>
            <Stack
              sx={{
                width: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: { xs: "row", sm: "column" },
              }}
            >
              <IconButton sx={{ color: "#333" }} aria-label="github">
                <GitHub />
              </IconButton>
              <IconButton sx={{ color: "#00a0dc" }} aria-label="linkedIn">
                <LinkedIn />
              </IconButton>
              <IconButton sx={{ color: "#1877f2" }} aria-label="facebook">
                <Facebook />
              </IconButton>
            </Stack>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
