import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  debounce,
  Grid,
  Modal,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import Layout from "../../../components/Layout";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useCallback, useEffect } from "react";
import api from "../../../services/api";
import useToast from "../../../utils/toast";
import { useRouter } from "next/router";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  bgcolor: "background.paper",
  p: 4,
  borderRadius: 2,
};

const Kuliner = () => {
  const [displayToast] = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [inputSearch, setInputSearch] = useState("");
  const [listDestinasi, setListDestinasi] = useState([]);
  const [tab, setTab] = useState("ALL");

  const debounceMountDestinasi = useCallback(
    debounce(mountGetDestinasi, 400),
    []
  );

  const pindahKeDetail = (item, ket) => {
    router.push(
      `/destinasi/${item.destinasi_id}?name=${encodeURIComponent(
        item.destinasi_name
      )}&ket=${encodeURIComponent(ket)}`
    );
  };

  const formatTime = (isoString) => {
    if (!isoString) return "N/A"; // Handle cases where the time string might be null or undefined

    const date = new Date(isoString);
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");

    return `${hours}:${minutes}`;
  };

  const handleSearchByEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (tab === "ALL") {
        debounceMountDestinasi("", e.target.value);
      } else {
        debounceMountDestinasi(tab, e.target.value);
      }
    }
  };

  async function mountGetDestinasi(label, value) {
    setIsLoading(true);
    try {
      const responseGetDestinasi = await api.getDestinasi("K", label, value);
      const { data, metadata } = responseGetDestinasi.data;
      setListDestinasi(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      displayToast(
        "error",
        "Gagal Mengambil Data Destinasi! Silahkan Refresh Halaman"
      );
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (!isFetching) {
      if (tab === "ALL") {
        debounceMountDestinasi("", inputSearch);
      } else {
        debounceMountDestinasi(tab, inputSearch);
      }
      setIsFetching(true);
    }
  }, [inputSearch, tab]);

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
              INGIN PERGI KE MANA?
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={1}>
          <Grid item xs={8}>
            <TextField
              fullWidth
              label='Masukkan nama destinasi dan tekan "ENTER" untuk mencari'
              variant="outlined"
              placeholder='Masukkan nama destinasi dan tekan "ENTER" untuk mencari'
              value={inputSearch}
              size="small"
              onChange={(e) => {
                setInputSearch(e.target.value);
                if (e.target.value === "") {
                  if (tab === "ALL") {
                    debounceMountDestinasi("", e.target.value);
                  } else {
                    debounceMountDestinasi(tab, e.target.value);
                  }
                }
              }}
              onKeyDown={handleSearchByEnter}
              sx={{ backgroundColor: "white" }}
            />
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#8D493A", mt: 0.2 }}
              startIcon={<SearchIcon />}
              fullWidth
              disabled={!inputSearch}
              onClick={() => {
                if (tab === "ALL") {
                  debounceMountDestinasi("", inputSearch);
                } else {
                  debounceMountDestinasi(tab, inputSearch);
                }
              }}
            >
              SEARCH
            </Button>
          </Grid>
        </Grid>

        <Grid container>
          <Grid container sx={{ mt: 2 }}>
            <Tabs
              value={tab}
              onChange={(e, newValue) => {
                setInputSearch("");
                setTab(newValue);
                if (newValue === "ALL") {
                  debounceMountDestinasi("", "");
                } else {
                  debounceMountDestinasi(newValue, "");
                }
              }}
            >
              <Tab label="SEMUA DATA" value={"ALL"} />
              <Tab label="HALAL" value={"H"} />
              <Tab label="NON HALAL" value={"N"} />
            </Tabs>
          </Grid>

          <Grid item xs={12}>
            {!listDestinasi ? (
              <Typography
                sx={{ mt: 10, fontWeight: 600, color: "red", mb: 20 }}
                align="center"
              >
                TIDAK ADA DATA DESTINASI!
              </Typography>
            ) : (
              <Box>
                {" "}
                <Typography
                  sx={{ mt: 2, mb: 2, fontWeight: 600 }}
                  align="center"
                  variant="h6"
                >
                  LIST{" "}
                  {tab === "ALL"
                    ? "DESTINASI KULINER"
                    : tab === "H"
                    ? "DESTINASI KULINER HALAL"
                    : "DESTINASI KULINER NON-HALAL"}
                </Typography>
                {listDestinasi.map((item) => (
                  <Grid item xs={12} key={item.destinasi_id}>
                    <Card
                      sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" }, // Adjust for mobile
                        borderRadius: 4,
                        boxShadow: 3,
                        mb: 3,
                      }}
                    >
                      <CardMedia
                        component="img"
                        sx={{
                          width: { xs: "100%", sm: 150 },
                          height: { xs: 200, sm: "auto" },
                        }} // Responsive image size
                        src={item.destinasi_gambar_url}
                        alt={item.destinasi_name}
                      />
                      <CardContent
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          width: "100%",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            flexDirection: { xs: "column", sm: "row" }, // Stack on mobile
                          }}
                        >
                          <Typography
                            variant="body1"
                            sx={{ fontWeight: 600, mb: 1 }}
                          >
                            {item.destinasi_name}{" "}
                            {item.destinasi_labelhalal === "N" ? (
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
                          </Typography>
                          <Button
                            size="small"
                            sx={{
                              alignSelf: { xs: "flex-start", sm: "flex-end" },
                            }} // Align button
                            onClick={() => pindahKeDetail(item, "K")}
                            variant={
                              window.innerWidth < 600 ? "contained" : "text"
                            }
                          >
                            Lihat Detail
                          </Button>
                        </Box>

                        <Box>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mt: 1 }}
                          >
                            {item.destinasi_alamat}
                          </Typography>
                          <Typography
                            sx={{ mt: 1 }}
                            variant="body2"
                            color="text.secondary"
                          >
                            Hari Buka: {item.destinasi_hbuka} -{" "}
                            {item.destinasi_htutup} (
                            {formatTime(item.destinasi_jbuka)} -{" "}
                            {formatTime(item.destinasi_jtutup)})
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Box>
            )}
          </Grid>
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

export default Kuliner;
