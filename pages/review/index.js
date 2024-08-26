import {
  Box,
  Button,
  Divider,
  Grid,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import Layout from "../../components/Layout";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import SaveIcon from "@mui/icons-material/Save";

const CustomStarIcon = styled(StarIcon)(({ theme }) => ({
  fontSize: 40, // Ganti ukuran sesuai kebutuhan
}));

const CustomStarBorderIcon = styled(StarBorderIcon)(({ theme }) => ({
  fontSize: 40, // Ganti ukuran sesuai kebutuhan
}));

const Review = () => {
  const [value, setValue] = useState(0);
  const [nama, setNama] = useState("");
  const [ulasan, setUlasan] = useState("");
  return (
    <Layout>
      <Box sx={{ pl: 3, pr: 3 }}>
        <Grid container>
          <Grid item xs={12}>
            <Typography
              variant="h5"
              align="center"
              sx={{ mb: 2, mt: 3, fontWeight: 600 }}
            >
              BERIKAN ULASAN DI BAWAH INI!
            </Typography>
          </Grid>
        </Grid>

        <Grid container sx={{ mb: 2 }}>
          <Grid item xs={12} align="center">
            <Rating
              name="simple-controlled"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
                console.log("newValue: " + newValue);
              }}
              icon={<CustomStarIcon />}
              emptyIcon={<CustomStarBorderIcon />}
            />
          </Grid>
        </Grid>

        <Grid container sx={{ mb: 2 }}>
          <Grid item xs={3}></Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Masukkan nama anda"
              variant="outlined"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
            />
          </Grid>

          <Grid item xs={3}></Grid>
        </Grid>

        <Grid container sx={{ mb: 2 }}>
          <Grid item xs={3}></Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Masukkan ulasan anda disini"
              variant="outlined"
              multiline
              rows={4}
              value={ulasan}
              onChange={(e) => setUlasan(e.target.value)}
            />
          </Grid>

          <Grid item xs={3}></Grid>
        </Grid>

        <Grid container sx={{ mb: 2 }}>
          <Grid item xs={3}></Grid>

          <Grid item xs={6}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<SaveIcon />}
              disabled={value === null || !nama || !ulasan}
            >
              SIMPAN
            </Button>
          </Grid>

          <Grid item xs={3}></Grid>
        </Grid>

        <Divider sx={{ mt: 3 }} />
      </Box>

      <Grid container>
        <Grid item xs={12}>
          <Typography
            variant="h5"
            align="center"
            sx={{ mb: 2, mt: 3, fontWeight: 600 }}
          >
            APA KATA MEREKA?
          </Typography>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Review;
