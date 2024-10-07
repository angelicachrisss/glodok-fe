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
  Modal,
  Typography,
} from "@mui/material";
import api from "../../../services/api";
import useToast from "../../../utils/toast";
import NavigationIcon from "@mui/icons-material/Navigation";
import MapIcon from "@mui/icons-material/Map";

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

  const debounceMountDestinasiByID = useCallback(
    debounce(mountGetDestinasiByID, 400),
    []
  );

  const PindahKeIndex = (jdid) => {
    console.log("jdid", jdid);

    if (jdid) {
      router.push(`/destinasi/${jdid}`);
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

    const { id, name, jenisdestinasiid } = router.query;
    setDestinasiID(id);
    setDestinasiName(name.toUpperCase());
    setJenisDestinasiID(jenisdestinasiid);

    if (id) {
      debounceMountDestinasiByID(id);
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
              onClick={() => PindahKeIndex(jenisDestinasiID)}
            >
              KEMBALI
            </Button>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12}>
            <Typography
              align="center"
              sx={{ mt: { xs: 2, sm: 0 }, fontWeight: 600 }}
              variant="h6"
            >
              DETAIL {destinasiName}
            </Typography>
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
          <Typography>{listDetailDestinasi.destinasi_alamat}</Typography>
        </Grid>

        <Grid sx={{ mb: 2 }}>
          <Typography sx={{ fontWeight: 600 }}>Deskripsi:</Typography>
          <Typography>{listDetailDestinasi.destinasi_desc}</Typography>
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
