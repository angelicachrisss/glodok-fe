import { useRouter } from "next/router";
import { useEffect, useState, useCallback } from "react";
import Layout from "../../components/Layout";
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
import api from "../../services/api";
import useToast from "../../utils/toast";
import NavigationIcon from "@mui/icons-material/Navigation";
import MapIcon from "@mui/icons-material/Map";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Bulan dimulai dari 0
  const year = date.getUTCFullYear();
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const seconds = String(date.getUTCSeconds()).padStart(2, "0");

  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
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

const DetailBerita = () => {
  const [displayToast] = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [beritaID, setBeritaID] = useState("");
  const [destinasiName, setDestinasiName] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [listDetailBerita, setListDetailBerita] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [jenisDestinasiID, setJenisDestinasiID] = useState("");

  const debounceMountGetBeritaByID = useCallback(
    debounce(mountGetBeritaByID, 400),
    []
  );

  const PindahKeIndex = () => {
    router.push(`/berita`);
  };

  async function mountGetBeritaByID(value) {
    setIsLoading(true);
    try {
      const response = await api.getBeritaByID(value);
      if (response && response.data) {
        const { data } = response.data;
        setListDetailBerita(data[0]);
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

    const { id } = router.query;
    setBeritaID(id);

    if (id) {
      debounceMountGetBeritaByID(id);
    }
  }, [router.isReady, router.query]);

  return (
    <Layout>
      <Box sx={{ pl: 4, pr: 4, mt: 3 }}>
        <Grid container>
          <Grid item xs={12}>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#8D493A", mt: 0.2 }}
              onClick={() => PindahKeIndex()}
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
              DETAIL BERITA
            </Typography>
          </Grid>
        </Grid>

        <Box sx={{ mt: 3, mb: 2 }}>
          <Grid container>
            <Grid item xs={12}>
              <a
                href={listDetailBerita.berita_foto_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={listDetailBerita.berita_foto_url}
                  alt={listDetailBerita.berita_judul}
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
              align="center"
              sx={{ mt: { xs: 2, sm: 0 }, fontWeight: 600 }}
              variant="h6"
            >
              {listDetailBerita.berita_judul}
            </Typography>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12}>
            <Typography
              align="center"
              sx={{ mt: { xs: 2, sm: 0 }, mb: 2 }}
              variant="subtitle2"
              color="text.secondary"
            >
              Date Updated: {formatDate(listDetailBerita.berita_date_update)}
            </Typography>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12}>
            <Typography
              align="center"
              sx={{ mt: { xs: 2, sm: 0 }, textAlign: "justify", mb: 2 }}
              variant="subtitle2"
              color="text.secondary"
            >
              {listDetailBerita.berita_desc}
            </Typography>
          </Grid>
        </Grid>

        <Grid sx={{ mb: 2 }}>
          <Typography sx={{ fontWeight: 600 }}>Link Sumber Berita: </Typography>
          {listDetailBerita &&
          listDetailBerita.berita_linksumber &&
          listDetailBerita.berita_linksumber.startsWith("https://") ? (
            <Typography>
              <a
                href={listDetailBerita.berita_linksumber}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "blue" }} // Atur gaya tautan
              >
                {listDetailBerita.berita_linksumber}
              </a>
            </Typography>
          ) : (
            <Typography>
              {listDetailBerita?.berita_linksumber || "Tidak ada link sumber"}
            </Typography>
          )}
        </Grid>

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

export default DetailBerita;
