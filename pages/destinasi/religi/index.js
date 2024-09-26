import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  debounce,
  Grid,
  Modal,
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

const Religi = () => {
  const [displayToast] = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [inputSearch, setInputSearch] = useState("");
  const [listDestinasi, setListDestinasi] = useState([]);

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
      debounceMountDestinasi(inputSearch);
    }
  };

  async function mountGetDestinasi(value) {
    setIsLoading(true);
    try {
      const responseGetDestinasi = await api.getDestinasi("R", value);
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
      debounceMountDestinasi(inputSearch);
      setIsFetching(true);
    }
  }, [inputSearch]);

  return (
    <Layout>
      <Box sx={{ pl: 4, pr: 4 }}>
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

        <Grid container>
          <Grid item xs={9.9}>
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
                  debounceMountDestinasi("");
                }
              }}
              onKeyDown={handleSearchByEnter}
              sx={{ backgroundColor: "white" }}
            />
          </Grid>

          <Grid item xs={0.1}></Grid>

          <Grid item xs={2}>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#8D493A", mt: 0.2 }}
              startIcon={<SearchIcon />}
              fullWidth
              disabled={!inputSearch}
              onClick={() => debounceMountDestinasi(inputSearch)}
            >
              SEARCH
            </Button>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12}>
            {!listDestinasi ? (
              <Typography
                sx={{ mt: 10, fontWeight: 600, color: "red" }}
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
                  LIST DESTINASI RELIGI
                </Typography>
                {listDestinasi.map((item, index) => (
                  <Grid item xs={12} key={item.destinasi_id}>
                    <Card
                      sx={{
                        display: "flex",
                        borderRadius: 4,
                        boxShadow: 3,
                        mb: 3,
                      }}
                    >
                      <CardMedia
                        component="img"
                        sx={{ width: 150 }}
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
                        {/* Box for title and details */}
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography variant="body1" sx={{ fontWeight: 600 }}>
                            {item.destinasi_name}
                          </Typography>
                          <Button
                            size="small"
                            sx={{ alignSelf: "flex-start" }}
                            onClick={() => pindahKeDetail(item, "R")}
                          >
                            Lihat Detail
                          </Button>
                        </Box>

                        {/* Box for address and open hours */}
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            {item.destinasi_alamat}
                          </Typography>
                          <Typography
                            sx={{ mt: 3 }}
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

export default Religi;
