import { Box, Grid, Typography } from "@mui/material";
import Layout from "../../components/Layout";

const Berita = () => {
  return (
    <Layout>
      <Box sx={{ pl: { xs: 2, sm: 4 }, pr: { xs: 2, sm: 4 } }}>
        <Grid container>
          <Grid item xs={12}>
            <Typography
              variant="h5"
              align="center"
              sx={{ mb: 2, mt: 3, fontWeight: 600 }}
            >
              BERITA TERBARU
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default Berita;
