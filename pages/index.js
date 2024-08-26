import React from "react";
import Link from "next/link";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Container maxWidth="sm">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome to My Next.js App
          </Typography>
          <Link href="/another-page" passHref>
            <Button variant="contained" color="primary">
              Get Started
            </Button>
          </Link>
        </Box>
      </Container>
    </div>
  );
}
