import Header from "./Header";
import Footer from "./Footer";
import { Box, Container, Grid } from "@mui/material";

export default function Layout({ children }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Header />
      <Grid
        component="main"
        sx={{
          flexGrow: 1,
          pt: "60px", // Adjust padding-top for fixed header
          px: 0, // Remove horizontal padding
          pb: 2, // Optional: Adds padding bottom
        }}
      >
        {children}
      </Grid>
      <Footer />
    </Box>
  );
}
