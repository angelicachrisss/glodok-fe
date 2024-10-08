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
  TextField,
  Typography,
} from "@mui/material";
import Layout from "../../components/Layout";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useCallback, useEffect } from "react";
import api from "../../services/api";
import useToast from "../../utils/toast";
import { useRouter } from "next/router";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%", // Increased for mobile view
  bgcolor: "background.paper",
  p: 4,
  borderRadius: 2,
};

const Destinasi = () => {
  const [displayToast] = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [inputSearch, setInputSearch] = useState("");
  const [listDestinasi, setListDestinasi] = useState([]);
  const [jenisDestinasiID, setJenisDestinasiID] = useState("");
  const [jenisDestinasiName, setJenisDestinasiName] = useState("");

  const debounceMountDestinasi = useCallback(
    debounce(mountGetDestinasi, 400),
    []
  );

  const pindahKeDetail = (item) => {
    // router.push(
    //   `/destinasi/detail/${item.destinasi_id}?name=${encodeURIComponent(
    //     item.destinasi_name
    //   )}&jenisdestinasiid=${encodeURIComponent(item.jenisdestinasi_id)}`
    // );

    router.push(`/destinasi/detail/${item.destinasi_id}`);
  };

  const formatTime = (isoString) => {
    if (!isoString) return "N/A";
    const date = new Date(isoString);
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const handleSearchByEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      debounceMountDestinasi(jenisDestinasiID, inputSearch);
    }
  };

  async function mountGetDestinasi(jenisdestinasiid, value) {
    setIsLoading(true);
    try {
      const responseGetDestinasi = await api.getDestinasi(
        jenisdestinasiid,
        value
      );
      const { data } = responseGetDestinasi.data;
      if (data === null) {
        displayToast("error", "Data destinasi tidak ada");
      } else {
        setListDestinasi(data);
        setJenisDestinasiName(data[0].jenisdestinasi_kat.toUpperCase());
      }

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
      debounceMountDestinasi(jenisDestinasiID, inputSearch);
      setIsFetching(true);
    }
  }, [inputSearch, jenisDestinasiID]);

  useEffect(() => {
    if (!router.isReady) return;

    const { id } = router.query;
    setJenisDestinasiID(id);
    // setJenisDestinasiName(name.toUpperCase());

    if (id) {
      debounceMountDestinasi(id, "");
    }
  }, [router.isReady, router.query]);

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
              value={inputSearch}
              size="small"
              onChange={(e) => {
                setInputSearch(e.target.value);
                if (e.target.value === "") {
                  debounceMountDestinasi(jenisDestinasiID, "");
                }
              }}
              onKeyDown={handleSearchByEnter}
              sx={{ backgroundColor: "white" }}
            />
          </Grid>

          <Grid item xs={4}>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#8D493A", mt: { sm: 0 } }}
              startIcon={<SearchIcon />}
              fullWidth
              disabled={!inputSearch}
              onClick={() =>
                debounceMountDestinasi(jenisDestinasiID, inputSearch)
              }
            >
              SEARCH
            </Button>
          </Grid>
        </Grid>

        {/* <Grid container>
          <Grid item xs={12}>
            {!listDestinasi ? (
              <Typography
                sx={{ mt: 10, fontWeight: 600, color: "red", mb: 20 }}
                align="center"
              >
                TIDAK ADA DATA DESTINASI {jenisDestinasiName}!
              </Typography>
            ) : (
              <Box>
                <Typography
                  sx={{ mt: 2, mb: 2, fontWeight: 600 }}
                  align="center"
                  variant="h6"
                >
                  LIST DESTINASI {jenisDestinasiName}
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
                          <Typography variant="body1" sx={{ fontWeight: 600 }}>
                            {item.destinasi_name}{" "}
                            {item.destinasi_labelhalalyn === "Y" ? (
                              <Chip
                                color="success"
                                label="Halal"
                                size="small"
                                sx={{ mb: 0.1 }}
                              />
                            ) : item.destinasi_labelhalalyn === "N" ? (
                              <Chip
                                color="error"
                                label="Non-Halal"
                                size="small"
                                sx={{ mb: 0.1 }}
                              />
                            ) : (
                              ""
                            )}{" "}
                            {item.destinasi_otentikyn === "Y" ? (
                              <Chip
                                color="success"
                                label="Otentik"
                                size="small"
                                sx={{ mb: 0.1 }}
                              />
                            ) : item.destinasi_otentikyn === "N" ? (
                              <Chip
                                color="error"
                                label="Non-Otentik"
                                size="small"
                                sx={{ mb: 0.1 }}
                              />
                            ) : (
                              ""
                            )}
                          </Typography>
                          <Button
                            size="small"
                            sx={{
                              alignSelf: { xs: "flex-start", sm: "flex-end" },
                            }} // Align button
                            onClick={() => pindahKeDetail(item, "W")}
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
        </Grid> */}

        <Grid container>
          <Grid item xs={12}>
            {!listDestinasi ? (
              <Typography
                sx={{ mt: 10, fontWeight: 600, color: "red", mb: 20 }}
                align="center"
              >
                TIDAK ADA DATA DESTINASI {jenisDestinasiName}!
              </Typography>
            ) : (
              <Box>
                <Typography
                  sx={{ mt: 2, mb: 2, fontWeight: 600 }}
                  align="center"
                  variant="h6"
                >
                  LIST DESTINASI {jenisDestinasiName}
                </Typography>
                {listDestinasi.map((item) => (
                  <Grid item xs={12} key={item.destinasi_id}>
                    <Card
                      sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
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
                        }}
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
                            flexDirection: { xs: "column", sm: "row" },
                          }}
                        >
                          <Typography variant="body1" sx={{ fontWeight: 600 }}>
                            {item.destinasi_name}
                          </Typography>
                          <Button
                            size="small"
                            sx={{
                              alignSelf: { xs: "flex-start", sm: "flex-end" },
                            }}
                            onClick={() => pindahKeDetail(item, "W")}
                            variant={
                              window.innerWidth < 600 ? "contained" : "text"
                            }
                          >
                            Lihat Detail
                          </Button>
                        </Box>

                        {/* Chip untuk Halal dan Otentik */}
                        <Box sx={{ display: "flex", flexWrap: "wrap", mt: 1 }}>
                          {item.destinasi_labelhalalyn === "Y" && (
                            <Chip
                              color="success"
                              label="Halal"
                              size="small"
                              sx={{ mr: 0.5, mb: 0.5 }}
                            />
                          )}
                          {item.destinasi_labelhalalyn === "N" && (
                            <Chip
                              color="error"
                              label="Non-Halal"
                              size="small"
                              sx={{ mr: 0.5, mb: 0.5 }}
                            />
                          )}
                          {item.destinasi_otentikyn === "Y" && (
                            <Chip
                              color="success"
                              label="Otentik"
                              size="small"
                              sx={{ mr: 0.5, mb: 0.5 }}
                            />
                          )}
                          {item.destinasi_otentikyn === "N" && (
                            <Chip
                              color="error"
                              label="Non-Otentik"
                              size="small"
                              sx={{ mr: 0.5, mb: 0.5 }}
                            />
                          )}
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

export default Destinasi;
