import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useMediaQuery } from "@mui/material";

const Navbar = () => {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          My Next.js App
        </Typography>
        {!isMobile ? (
          <Box sx={{ display: "flex" }}>
            <Button color="inherit" component={Link} href="/">
              Home
            </Button>
            <Button color="inherit" component={Link} href="/another-page">
              Another Page
            </Button>
          </Box>
        ) : (
          <Box sx={{ display: "flex" }}>
            <Button color="inherit" component={Link} href="/">
              Home
            </Button>
            <Button color="inherit" component={Link} href="/another-page">
              Another Page
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
