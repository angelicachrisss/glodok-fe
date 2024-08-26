import { Box, Typography } from "@mui/material";
import Layout from "../../components/Layout";

const VirtualTour = () => {
  return (
    <Layout>
      <Box>
        <Typography variant="h4" align="center" sx={{ mb: 2, mt: 3 }}>
          Virtual Tour
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // mb: 3, // Optional: Adds margin bottom to separate from other content
          }}
        >
          <Box
            component="iframe"
            src="https://www.google.com/maps/embed?pb=!4v1724655920526!6m8!1m7!1sljgseTkYM_IsZDFOR5xF3g!2m2!1d-6.142525468708366!2d106.814621961638!3f307.9446347161664!4f6.129876015530229!5f0.7820865974627469"
            sx={{
              width: "100%",
              maxWidth: "100%", // Ensure it does not overflow container
              height: "500px",
              border: "none",
              //   borderRadius: "4px", // Optional: Adds rounded corners
            }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Box>
      </Box>
    </Layout>
  );
};

export default VirtualTour;
