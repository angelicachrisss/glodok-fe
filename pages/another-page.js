import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Navbar from "../components/Navbar";
import GoogleMaps from "../components/GoogleMaps";

export default function AnotherPage() {
  return (
    <div>
      <Navbar />
      <Container maxWidth="sm">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Another Page
          </Typography>
          <Typography variant="body1">
            This is another page of the Next.js app.
          </Typography>

          <GoogleMaps />
        </Box>
      </Container>
    </div>
  );
}
