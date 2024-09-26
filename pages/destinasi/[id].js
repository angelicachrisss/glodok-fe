import { useRouter } from "next/router";
import { useEffect, useState, useCallback } from "react";
import Layout from "../../components/Layout";
import {
  Box,
  Button,
  CircularProgress,
  debounce,
  Grid,
  Modal,
  Typography,
} from "@mui/material";
import api from "../../services/api";
import useToast from "../../utils/toast";

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

  const debounceMountDestinasiByID = useCallback(
    debounce(mountGetDestinasiByID, 400),
    []
  );

  const PindahKeIndex = (kode) => {
    let destinationPath = "";

    if (kode === "W") {
      destinationPath = "/destinasi/warisan";
    } else if (kode === "K") {
      destinationPath = "/destinasi/kuliner";
    } else if (kode === "R") {
      destinationPath = "/destinasi/religi";
    } else {
      console.warn("Kode tidak dikenali:", kode);
      return;
    }

    router.push(destinationPath);
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

  useEffect(() => {
    if (!router.isReady) return;

    const { id, name, ket } = router.query;
    setDestinasiID(id);
    setDestinasiName(name.toUpperCase());
    setKeterangan(ket);

    if (id) {
      debounceMountDestinasiByID(id);
    }

    // Request user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location: ", error);
          displayToast("error", "Gagal mendapatkan lokasi Anda.");
        }
      );
    } else {
      displayToast("error", "Geolocation is not supported by this browser.");
    }
  }, [router.isReady, router.query]);

  const latitude = listDetailDestinasi.destinasi_lang;
  const longitude = listDetailDestinasi.destinasi_long;
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
  // const userMapUrl = userLocation
  //   ? `https://www.google.com/maps/search/?api=1&query=${userLocation.latitude},${userLocation.longitude}`
  //   : "";

  const userMapUrl = userLocation
    ? `https://www.google.com/maps/dir/?api=1&origin=${userLocation.latitude},${userLocation.longitude}&destination=${latitude},${longitude}`
    : "";

  return (
    <Layout>
      <Box sx={{ pl: 4, pr: 4, mt: 3 }}>
        <Grid container>
          <Grid item xs={2}>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#8D493A", mt: 0.2 }}
              fullWidth
              onClick={() => PindahKeIndex(keterangan)}
            >
              KEMBALI
            </Button>
          </Grid>
          <Grid item xs={10}>
            <Typography
              align="center"
              sx={{ mt: 1, fontWeight: 600 }}
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

        {listDetailDestinasi.destinasi_labelhalal && (
          <Grid sx={{ mb: 2 }}>
            <Typography sx={{ fontWeight: 600 }}>Label Halal:</Typography>
            <Typography>{listDetailDestinasi.destinasi_labelhalal}</Typography>
          </Grid>
        )}

        <Grid sx={{ mb: 2 }}>
          <Typography sx={{ fontWeight: 600 }}>Alamat:</Typography>
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
          <Button
            variant="contained"
            color="primary"
            size="small"
            href={mapUrl}
            target="_blank"
          >
            Buka Peta
          </Button>
        </Grid>

        {userLocation && (
          <Grid sx={{ mb: 2 }}>
            <Typography sx={{ fontWeight: 600 }}>
              Klik di sini untuk melihat rute terbaik di Google Maps!
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              href={userMapUrl}
              target="_blank"
            >
              KE GOOGLE MAPS
            </Button>
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
