import { useRouter } from "next/router";
import { useEffect, useState, useCallback } from "react";
import Layout from "../../../components/Layout";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  debounce,
  Fab,
  Grid,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import api from "../../../services/api";
import useToast from "../../../utils/toast";
import NavigationIcon from "@mui/icons-material/Navigation";
import MapIcon from "@mui/icons-material/Map";
import StarIcon from "@mui/icons-material/Star";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const formatTime = (isoString) => {
  if (!isoString) return "N/A";
  const date = new Date(isoString);
  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  p: 4,
  borderRadius: 2,
};

const DetailDestinasi = () => {
  const [displayToast] = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [destinasiID, setDestinasiID] = useState("");
  const [destinasiName, setDestinasiName] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [listDetailDestinasi, setListDetailDestinasi] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [jarak, setJarak] = useState(null);
  const [jenisDestinasiID, setJenisDestinasiID] = useState("");
  const [locationFetched, setLocationFetched] = useState(false); // New state to track location fetching
  const [avgRating, setAvgRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);

  const debounceMountDestinasiByID = useCallback(
    debounce(mountGetDestinasiByID, 400),
    []
  );

  const debounceAvgRating = useCallback(debounce(mountGetAverage, 400), []);

  const PindahKeIndex = (jdid) => {
    if (jdid) {
      router.push(`/destinasi/${jdid}`);
    } else {
      console.warn("Jenis Destinasi ID is undefined");
    }
  };

  const PindahKeDetail = (id) => {
    if (id) {
      router.push(`/destinasi/detailreview/${id}`);
    } else {
      console.warn("Jenis Destinasi ID is undefined");
    }
  };

  async function mountGetDestinasiByID(value) {
    setIsLoading(true);
    try {
      const responseGetDestinasi = await api.getDestinasiByID(value);
      if (responseGetDestinasi && responseGetDestinasi.data) {
        const { data } = responseGetDestinasi.data;
        setListDetailDestinasi(data[0]);
      } else {
        throw new Error("Response data is undefined or null");
      }
    } catch (error) {
      console.error(error);
      displayToast(
        "error",
        "Gagal Mengambil Data Destinasi! Silahkan Refresh Halaman"
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function mountGetAverage(value) {
    setIsLoading(true);
    try {
      const response = await api.getAvgRating(value);
      const { data, metadata } = response.data;
      setAvgRating(data);
      setTotalReviews(metadata.total_data);
    } catch (error) {
      console.error(error);
      displayToast(
        "error",
        "Gagal Mengambil Data Destinasi! Silahkan Refresh Halaman"
      );
    } finally {
      setIsLoading(false);
    }
  }

  const latitude = listDetailDestinasi.destinasi_lang;
  const longitude = listDetailDestinasi.destinasi_long;
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

  const userMapUrl = userLocation
    ? `https://www.google.com/maps/dir/?api=1&origin=${userLocation.latitude},${userLocation.longitude}&destination=${latitude},${longitude}`
    : "";

  //   useEffect(() => {
  //     if (!router.isReady) return;

  //     const { id, name, jenisdestinasiid } = router.query;
  //     console.log("router", router);

  //     console.log("masuk", id, name, jenisdestinasiid);

  //     setDestinasiID(id);
  //     setDestinasiName(name.toUpperCase());
  //     setJenisDestinasiID(jenisdestinasiid);

  //     if (id) {
  //       debounceMountDestinasiByID(id);
  //     }

  //     // Request user's location
  //     if (navigator.geolocation) {
  //       navigator.geolocation.getCurrentPosition(
  //         (position) => {
  //           setUserLocation({
  //             latitude: position.coords.latitude,
  //             longitude: position.coords.longitude,
  //           });
  //         },
  //         (error) => {
  //           console.error("Error getting location: ", error);
  //           displayToast("error", "Gagal mendapatkan lokasi Anda.");
  //         }
  //       );
  //     } else {
  //       displayToast("error", "Geolocation is not supported by this browser.");
  //     }
  //   }, [router.isReady, router.query]);

  useEffect(() => {
    if (!router.isReady) return;

    // const { id, name, jenisdestinasiid } = router.query;
    const { id } = router.query;
    setDestinasiID(id);
    // setDestinasiName(name.toUpperCase());
    // setJenisDestinasiID(jenisdestinasiid);

    if (id) {
      debounceMountDestinasiByID(id);
      debounceAvgRating(id);
    }

    // Request user's location only if it hasn't been fetched yet
    if (!locationFetched && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setLocationFetched(true); // Mark location as fetched
        },
        (error) => {
          console.error("Error getting location: ", error);
          displayToast("error", "Gagal mendapatkan lokasi Anda.");
        }
      );
    } else if (!navigator.geolocation) {
      displayToast("error", "Geolocation is not supported by this browser.");
    }
  }, [router.isReady, router.query, locationFetched]);

  return (
    <Layout>
      <Box sx={{ pl: 4, pr: 4, mt: 3 }}>
        <Grid container>
          <Grid item xs={12}>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#8D493A", mt: 0.2 }}
              onClick={() =>
                PindahKeIndex(listDetailDestinasi.jenisdestinasi_id)
              }
            >
              KEMBALI
            </Button>
          </Grid>
        </Grid>

        <Box sx={{ mt: 3, mb: 2 }}>
          <Grid container>
            <Grid item xs={12}>
              <a
                href={listDetailDestinasi.destinasi_gambar_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={listDetailDestinasi.destinasi_gambar_url}
                  alt={listDetailDestinasi.destinasi_name}
                  style={{
                    width: "100%",
                    height: "auto",
                    maxHeight: "200px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              </a>
            </Grid>
          </Grid>
        </Box>

        <Grid container>
          <Grid item xs={12}>
            <Typography
              // align="center"
              sx={{ mt: { xs: 2, sm: 0 }, fontWeight: 600 }}
              variant="h6"
            >
              {listDetailDestinasi.destinasi_name}
            </Typography>
          </Grid>
        </Grid>

        <Grid container sx={{ mb: 2 }} alignItems="center">
          <Grid item xs={1} sm={0.3}>
            <StarIcon
              sx={{
                color: "orange",
                fontSize: { xs: "20px", sm: "inherit" },
              }}
            />
          </Grid>
          <Grid item xs={8} sm={5}>
            <Typography
              sx={{
                color: "black",
                fontSize: { xs: "14px", sm: "16px" },
                fontWeight: "bold",
                mb: 0.5,
              }}
            >
              {totalReviews !== 0
                ? `${avgRating} - ${totalReviews} ULASAN`
                : `${avgRating} - BELUM ADA ULASAN`}
              {totalReviews !== 0 && (
                <IconButton
                  color="black"
                  size="small"
                  sx={{ mb: 0.5, ml: 1 }} // Add some margin for spacing
                  onClick={() => PindahKeDetail(destinasiID)}
                >
                  <NavigateNextIcon fontSize="inherit" />
                </IconButton>
              )}
            </Typography>
          </Grid>
        </Grid>

        {listDetailDestinasi.destinasi_labelhalalyn && (
          <Grid sx={{ mb: 2 }}>
            <Typography sx={{ fontWeight: 600 }}>Label Halal:</Typography>
            {listDetailDestinasi.destinasi_labelhalalyn === "N" ? (
              <Chip
                color="error"
                label="Non-Halal"
                size="small"
                sx={{ mb: 0.1 }}
              />
            ) : (
              <Chip
                color="success"
                label="Halal"
                size="small"
                sx={{ mb: 0.1 }}
              />
            )}
          </Grid>
        )}

        {listDetailDestinasi.destinasi_otentikyn && (
          <Grid sx={{ mb: 2 }}>
            <Typography sx={{ fontWeight: 600 }}>Label Halal:</Typography>
            {listDetailDestinasi.destinasi_otentikyn === "N" ? (
              <Chip
                color="error"
                label="Non-Otentik"
                size="small"
                sx={{ mb: 0.1 }}
              />
            ) : (
              <Chip
                color="success"
                label="Otentik"
                size="small"
                sx={{ mb: 0.1 }}
              />
            )}
          </Grid>
        )}

        <Grid sx={{ mb: 2 }}>
          <Typography sx={{ fontWeight: 600 }}>
            Alamat:{" "}
            {/* <Button size="small" startIcon={<MapIcon />}>
              Lokasi
            </Button> */}
          </Typography>
          <Typography sx={{ textAlign: "justify" }}>
            {listDetailDestinasi.destinasi_alamat}
          </Typography>
        </Grid>

        <Grid sx={{ mb: 2 }}>
          <Typography sx={{ fontWeight: 600 }}>Deskripsi:</Typography>
          <Typography sx={{ textAlign: "justify" }}>
            {listDetailDestinasi.destinasi_desc}
          </Typography>
        </Grid>

        <Grid sx={{ mb: 2 }}>
          <Typography sx={{ fontWeight: 600 }}>Hari Operasional:</Typography>
          <Typography>
            {listDetailDestinasi.destinasi_hbuka} -{" "}
            {listDetailDestinasi.destinasi_htutup} (
            {formatTime(listDetailDestinasi.destinasi_jbuka)} -{" "}
            {formatTime(listDetailDestinasi.destinasi_jtutup)})
          </Typography>
        </Grid>

        <Grid sx={{ mb: 2 }}>
          <Typography sx={{ fontWeight: 600 }}>Peta Lokasi:</Typography>
          {/* <Button
            variant="contained"
            color="primary"
            size="small"
            href={mapUrl}
            target="_blank"
          >
            <MapIcon /> Buka Peta
          </Button> */}

          <Fab
            variant="extended"
            size="medium"
            sx={{ mt: 1 }}
            href={mapUrl}
            target="_blank"
            color="primary"
          >
            <MapIcon sx={{ mr: 1 }} />
            BUKA PETA
          </Fab>
        </Grid>

        {userLocation && (
          <Grid sx={{ mb: 2 }}>
            {/* <Typography sx={{ fontWeight: 600, color: "red" }}>
              Jarak dari titik anda ke titik tujuan ± {jarak} km
            </Typography> */}
            <Typography sx={{ fontWeight: 600 }}>
              Klik di sini untuk melihat rute terbaik di Google Maps!
            </Typography>
            {/* <Button
              variant="contained"
              color="secondary"
              size="small"
              href={userMapUrl}
              target="_blank"
            >
              KE GOOGLE MAPS
            </Button> */}
            <Fab
              variant="extended"
              size="medium"
              sx={{ mt: 1 }}
              href={userMapUrl}
              target="_blank"
              color="error"
            >
              <NavigationIcon sx={{ mr: 1 }} />
              KE GOOGLE MAPS
            </Fab>
          </Grid>
        )}

        <Modal open={isLoading}>
          <Box sx={style} style={{ textAlign: "center" }}>
            <Typography>
              Mohon Tunggu Permintaan Anda Sedang Di Proses
            </Typography>
            <CircularProgress />
          </Box>
        </Modal>
      </Box>
    </Layout>
  );
};

export default DetailDestinasi;
