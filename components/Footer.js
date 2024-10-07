import React from "react";
import { Container, Grid, Typography, Link, Box } from "@mui/material";

const Footer = () => {
  return (
    <Box sx={{ bgcolor: "#202020", p: 2, color: "white" }}>
      <Container>
        <Grid
          container
          spacing={3}
          justifyContent="space-between"
          // justifyContent="center"
          alignItems="center"
        >
          <Grid
            item
            xs={12}
            sm={4}
            sx={{ textAlign: { xs: "center", sm: "center" } }}
          >
            <img
              src="/static/logo/pesonaglodok.png"
              alt="Logo"
              style={{ maxWidth: "150px", height: "auto" }}
            />
          </Grid>

          <Grid
            item
            xs={12}
            sm={8}
            sx={{ textAlign: { xs: "center", sm: "left" } }}
          >
            <Typography variant="h6" color="white">
              Let's Explore
            </Typography>
            <Box
              sx={{
                mt: 2,
                borderRadius: 1,
                overflow: "hidden",
                width: "100%",
                height: "auto",
                maxWidth: "100%", // Ensure the iframe doesn't exceed the container width
              }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1983.4561732263478!2d106.8145836133095!3d-6.142475705597889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f606e0ec5b0f%3A0x8af50a20c0c9a51d!2sJl.%20Pancoran%20No.4%2010d%2C%20RT.9%2FRW.6%2C%20Glodok%2C%20Taman%20Sari%2C%20West%20Jakarta%20City%2C%20Jakarta%2011120!5e0!3m2!1sen!2sid!4v1724642758267!5m2!1sen!2sid"
                width="100%"
                height="200" // Adjust height for better fit on mobile
                style={{ border: "0" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </Box>
          </Grid>
        </Grid>
        <Box
          sx={{
            mt: 4,
            textAlign: "center",
            borderTop: "1px solid gray",
            pt: 2,
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ color: "white" }}
          >
            &copy; 2024 Pesona Glodok. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
