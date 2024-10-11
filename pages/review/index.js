import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Chip,
  Divider,
  FormControlLabel,
  Grid,
  Pagination,
  Paper,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import Layout from "../../components/Layout";
import { useCallback, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import SaveIcon from "@mui/icons-material/Save";
import api from "../../services/api";
import useToast from "../../utils/toast";
import { ceil, debounce } from "lodash";
import { getStorage } from "../../utils/storage";

const CustomStarIcon = styled(StarIcon)(({ theme }) => ({
  fontSize: 40, // Ganti ukuran sesuai kebutuhan
}));

const CustomStarBorderIcon = styled(StarBorderIcon)(({ theme }) => ({
  fontSize: 40, // Ganti ukuran sesuai kebutuhan
}));

const Review = () => {
  const [displayToast] = useToast();
  const [value, setValue] = useState(0);
  const [ulasan, setUlasan] = useState("");
  const [listDestinasi, setListDestinasi] = useState([]);
  const [selectedDestinasi, setSelectedDestinasi] = useState(null);
  const [checked, setChecked] = useState(false);

  const [token, setToken] = useState(null);
  const [id, setId] = useState(null);

  const debounceInsertReview = useCallback(debounce(insertReview, 400), []);
  const debounceGetDestinasi = useCallback(debounce(getDestinasi, 400), []);

  const capitalizeFirstLetter = (str) => {
    if (str.length === 0) return str; // Jika string kosong, kembalikan string kosong
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  async function insertReview(rating, id, userid, desc, anon) {
    console.log("id", id);

    const payload = {
      review_rating: rating,
      destinasi_id: id,
      user_id: userid,
      review_desc: capitalizeFirstLetter(desc),
      review_anonyn: anon,
    };

    try {
      const responseReview = await api.insertReview(payload);
      const { data } = responseReview.data;

      if (data === "Berhasil") {
        displayToast("success", "Berhasil Membuat Review!");
        setValue(0);
        setUlasan("");
        setSelectedDestinasi(null);
        setChecked(false);
      } else {
        displayToast("error", "Gagal Membuat Review!");
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function getDestinasi() {
    try {
      const response = await api.getDestinasiDropDown();
      const { data } = response.data;

      setListDestinasi(data);
    } catch (error) {
      displayToast("error", "Terjadi kesalahan! Silahkan Refresh Halaman");
    }
  }

  useEffect(() => {
    debounceGetDestinasi();
  }, []);

  useEffect(() => {
    const storedToken = getStorage("ket_masuk");
    const userid = getStorage("userid");
    setToken(storedToken);
    setId(userid);
  }, []);

  return (
    <Layout>
      {!token ? (
        <Box sx={{ pl: 1, pr: 1 }}>
          <Typography
            variant="h5"
            align="center"
            sx={{ mb: 2, mt: 3, fontWeight: 600 }}
          >
            MAAF, ANDA TIDAK DAPAT MENGAKSES HALAMAN REVIEW!
          </Typography>
          <Typography
            variant="body1"
            align="center"
            sx={{ mb: 2, fontWeight: 400 }}
          >
            Silahkan masuk terlebih dahulu ke halaman <a href="/login">LOGIN</a>{" "}
            untuk memberikan ulasan.
          </Typography>
        </Box>
      ) : (
        <Box sx={{ pl: 1, pr: 1 }}>
          <Grid container>
            <Grid item xs={12}>
              <Typography
                variant="h5"
                align="center"
                sx={{ mb: 2, mt: 3, fontWeight: 600 }}
              >
                BERIKAN ULASAN GLODOK PANCORAN DI BAWAH INI!
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
            <Grid item xs={12} md={10} mx="auto">
              <Autocomplete
                value={selectedDestinasi}
                onChange={(event, newValue) => {
                  setSelectedDestinasi(newValue);
                }}
                options={listDestinasi}
                getOptionLabel={(option) => option.destinasi_name || ""}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Pilih Destinasi"
                    variant="outlined"
                  />
                )}
              />
            </Grid>
          </Grid>

          <Grid container sx={{ mb: 2 }}>
            <Grid item xs={12} md={10} mx="auto">
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
          </Grid>

          <Grid container sx={{ mb: 2 }}>
            <Grid item xs={12} md={10} mx="auto">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    onChange={(e) => setChecked(e.target.checked)}
                  />
                }
                label="Sembunyikan namamu"
                sx={{ mt: -2 }}
              />
            </Grid>
          </Grid>

          <Grid container sx={{ mb: 2 }}>
            <Grid item xs={12} md={10} mx="auto">
              <Button
                fullWidth
                variant="contained"
                startIcon={<SaveIcon />}
                disabled={
                  value === 0 || value === null || !ulasan || !selectedDestinasi
                }
                onClick={() => {
                  const anon = checked === true ? "Y" : "N";
                  debounceInsertReview(
                    value,
                    selectedDestinasi.destinasi_id,
                    id,
                    ulasan,
                    anon
                  );
                }}
                // onClick={() => {
                //   console.log("masuk", selectedDestinasi.destinasi_id);
                // }}
              >
                SIMPAN
              </Button>
            </Grid>
          </Grid>
        </Box>
      )}
    </Layout>
  );
};

export default Review;
