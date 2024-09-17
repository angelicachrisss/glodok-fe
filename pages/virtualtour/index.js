import { Box, Typography } from "@mui/material";
import Layout from "../../components/Layout";

const VirtualTour = () => {
  return (
    <Layout>
      <Box sx={{ width: "100%", height: "100vh",mb:-2 }}>
        {/* <Typography
          variant="h5"
          align="center"
          sx={{ mb: 2, mt: 3, fontWeight: 600 }}
        >
          Virtual Tour
        </Typography> */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
            overflow: "hidden", // Ensure no overflow from the iframe
            
          }}
        >
          <Box
            component="iframe"
            src="https://www.google.com/maps/embed?pb=!4v1724655920526!6m8!1m7!1sljgseTkYM_IsZDFOR5xF3g!2m2!1d-6.142525468708366!2d106.814621961638!3f307.9446347161664!4f6.129876015530229!5f0.7820865974627469"
            sx={{
              width: "100%",
              height: "100%",
              border: "none",
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
