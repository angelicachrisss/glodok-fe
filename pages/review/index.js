import {
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
  const [listReview, setListReview] = useState([]);
  const [totalData, setTotalData] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [rating, setRating] = useState("");

  const [params, setParams] = useState({
    page: 0,
    length: 6,
  });

  const debounceInsertReview = useCallback(debounce(insertReview, 400), []);
  const debounceGetReview = useCallback(debounce(getReview, 400), []);

  const ratingOptions = [
    { label: "All Ratings", value: "" },
    { icon: <StarIcon />, label: "5", value: "5" },
    { icon: <StarIcon />, label: "4", value: "4" },
    { icon: <StarIcon />, label: "3", value: "3" },
    { icon: <StarIcon />, label: "2", value: "2" },
    { icon: <StarIcon />, label: "1", value: "1" },
  ];

  const handleChipClick = (value) => {
    setRating(value);
    setParams({ ...params, page: 0 }); // Reset to the first page on filter
    debounceGetReview(value, params);
  };

  const capitalizeFirstLetter = (str) => {
    if (str.length === 0) return str; // Jika string kosong, kembalikan string kosong
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handlePageChange = (event, newPage) => {
    setParams((prevParams) => ({
      ...prevParams,
      page: newPage - 1, // Pagination mulai dari 1, sedangkan params.page mulai dari 0
    }));
  };

  async function insertReview(tab, rating, name, desc) {
    const payload = {
      review_rating: rating,
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
        if (tab === "") {
          debounceGetReview("", { page: 0, length: 6 });
        } else {
          debounceGetReview(tab, { page: 0, length: 6 });
        }
        // setParams({ page: 0, length: 6 });
      } else {
        displayToast("error", "Gagal Membuat Review!");
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function getReview(rating, params) {
    try {
      const responseGetReview = await api.getReview(rating, params);
      const { data, metadata } = responseGetReview.data;
      setListReview(data);
      setTotalData(metadata.total_data);
      setTotalPage(ceil(metadata.total_data / params.length)); // Perbaiki pembagian total data
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (rating === "") {
      debounceGetReview("", params);
    } else {
      debounceGetReview(rating, params);
    }
  }, [params, rating]);

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
              disabled={value === 0 || value === null || !nama || !ulasan}
              onClick={() => debounceInsertReview(rating, value, nama, ulasan)}
            >
              SIMPAN
            </Button>
          </Grid>
        </Grid>

        <Divider sx={{ mt: 3 }} />
      </Box>

      <Grid container>
        <Grid item xs={12}>
          <Typography
            variant="h5"
            align="center"
            sx={{ mb: 2, mt: 1, fontWeight: 600 }}
          >
            APA KATA MEREKA?
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={1} justifyContent="center" sx={{ mb: 2 }}>
        {ratingOptions.map((option) => (
          <Grid item key={option.value}>
            <Chip
              label={option.label}
              variant={rating === option.value ? "filled" : "outlined"}
              color={rating === option.value ? "primary" : "default"}
              onClick={() => handleChipClick(option.value)}
              icon={option.icon}
              size="small"
            />
          </Grid>
        ))}
      </Grid>

      <Grid container>
        {totalData !== 0 ? (
          <Grid item xs={12}>
            <Typography variant="body1" align="center" sx={{ mb: 2 }}>
              Data Review : {totalData}
            </Typography>
          </Grid>
        ) : (
          <Typography></Typography>
        )}
      </Grid>

      {/* <Grid container spacing={2} sx={{ pl: 6, pr: 6 }}>
        {listReview.map((review) => (
          <Grid item xs={12} sm={6} key={review.review_id}>
            <Paper style={{ padding: 16, marginBottom: 16 }}>
              <Typography variant="h6" component="div">
                {review.reviewer_name}
              </Typography>
              <Rating
                name="read-only"
                value={review.review_rating}
                readOnly
                precision={0.5}
              />
              <Typography
                variant="body2"
                color="textSecondary"
                style={{ margin: "8px 0" }}
              >
                {review.review_desc}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                {new Date(review.review_date).toLocaleDateString()}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid> */}

      <Grid container spacing={2} sx={{ pl: 6, pr: 6 }}>
        {listReview !== null ? (
          listReview &&
          listReview.map((review, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Paper style={{ padding: 16, marginBottom: 16 }}>
                <Typography variant="h6" component="div">
                  {review.reviewer_name}
                </Typography>
                <Rating
                  name="read-only"
                  value={review.review_rating}
                  readOnly
                  precision={0.5}
                />
                <Typography
                  variant="body2"
                  color="textSecondary"
                  style={{ margin: "8px 0" }}
                >
                  {review.review_desc}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  Tanggal Review:{" "}
                  {/* {new Date(review.review_date).toLocaleDateString()} */}
                  {formatDate(review.review_date)}
                </Typography>
              </Paper>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="h6" align="center" color="textSecondary">
              Tidak ada ulasan.
            </Typography>
          </Grid>
        )}
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
        <Pagination
          count={totalPage}
          page={params.page + 1}
          shape="rounded"
          variant="outlined"
          color="primary"
          onChange={handlePageChange}
        />
      </Box>
    </Layout>
  );
};

export default Review;
