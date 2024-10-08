import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Divider,
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

const CustomStarIcon = styled(StarIcon)(({ theme }) => ({
  fontSize: 40, // Ganti ukuran sesuai kebutuhan
}));

const CustomStarBorderIcon = styled(StarBorderIcon)(({ theme }) => ({
  fontSize: 40, // Ganti ukuran sesuai kebutuhan
}));

const formatDate = (dateString) => {
  // Create a new Date object from the date string
  const date = new Date(dateString);

  // Handle time zone adjustment if necessary
  const options = { timeZone: "UTC", hour12: false };

  const day = String(
    date.toLocaleString("en-GB", { day: "2-digit", timeZone: "UTC" })
  ).padStart(2, "0");
  const month = String(
    date.toLocaleString("en-GB", { month: "2-digit", timeZone: "UTC" })
  ).padStart(2, "0");
  const year = date.toLocaleString("en-GB", {
    year: "numeric",
    timeZone: "UTC",
  });
  const hours = String(
    date
      .toLocaleString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "UTC",
      })
      .split(":")[0]
  ).padStart(2, "0");
  const minutes = String(
    date
      .toLocaleString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "UTC",
      })
      .split(":")[1]
  ).padStart(2, "0");

  return `${day}-${month}-${year} - ${hours}:${minutes}`;
};

const Review = () => {
  const [displayToast] = useToast();
  const [value, setValue] = useState(0);
  const [nama, setNama] = useState("");
  const [ulasan, setUlasan] = useState("");
  const [listDestinasi, setListDestinasi] = useState([]);
  const [selectedDestinasi, setSelectedDestinasi] = useState(null);

  const debounceInsertReview = useCallback(debounce(insertReview, 400), []);
  const debounceGetDestinasi = useCallback(debounce(getDestinasi, 400), []);

  const capitalizeFirstLetter = (str) => {
    if (str.length === 0) return str; // Jika string kosong, kembalikan string kosong
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  async function insertReview(rating, id, name, desc) {
    console.log("id", id);

    const payload = {
      review_rating: rating,
      destinasi_id: id,
      reviewer_name: capitalizeFirstLetter(name),
      review_desc: capitalizeFirstLetter(desc),
    };

    try {
      const responseReview = await api.insertReview(payload);
      const { data } = responseReview.data;

      if (data === "Berhasil") {
        displayToast("success", "Berhasil Membuat Review!");
        setValue(0);
        setNama("");
        setUlasan("");
        setSelectedDestinasi(null);
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

  return (
    <Layout>
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
            <TextField
              fullWidth
              label="Masukkan nama anda"
              variant="outlined"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
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
            <Button
              fullWidth
              variant="contained"
              startIcon={<SaveIcon />}
              disabled={
                value === 0 ||
                value === null ||
                !nama ||
                !ulasan ||
                !selectedDestinasi
              }
              onClick={() => {
                console.log(
                  "masuk",
                  value,
                  selectedDestinasi.destinasi_id,
                  nama,
                  ulasan
                );

                debounceInsertReview(
                  value,
                  selectedDestinasi.destinasi_id,
                  nama,
                  ulasan
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
    </Layout>
  );
};

export default Review;
