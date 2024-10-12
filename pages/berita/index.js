import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  Modal,
  Pagination,
  TextField,
  Typography,
} from "@mui/material";
import Layout from "../../components/Layout";
import api from "../../services/api";
import useToast from "../../utils/toast";
import { useCallback, useEffect, useState } from "react";
import { ceil, debounce } from "lodash";
import SearchIcon from "@mui/icons-material/Search";
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

const Berita = () => {
  const [displayToast] = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [totalData, setTotalData] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [listBerita, setListBerita] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [inputSearch, setInputSearch] = useState("");

  const [params, setParams] = useState({
    page: 0,
    length: 6,
  });

  const debounceGetBerita = useCallback(debounce(mountGetBerita, 400), []);

  const pindahKeDetail = (item) => {
    router.push(`/berita/${item.berita_id}`);
  };

  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };

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

  const handlePageChange = (event, newPage) => {
    setParams((prevParams) => ({
      ...prevParams,
      page: newPage - 1, // Pagination mulai dari 1, sedangkan params.page mulai dari 0
    }));
  };

  const handleSearchByEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      debounceGetBerita(inputSearch, params);
    }
  };

  async function mountGetBerita(value, param) {
    setIsLoading(true);
    try {
      const response = await api.getBerita(value, param);
      const { data, metadata } = response.data;
      setListBerita(data);
      setTotalData(metadata.total_data);
      setTotalPage(ceil(metadata.total_data / params.length)); // Perbaiki pembagian total data
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      displayToast(
        "error",
        "Gagal Mengambil Data Berita! Silahkan Refresh Halaman"
      );
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (!isFetching) {
      debounceGetBerita(inputSearch, params);
      setIsFetching(true);
    }
  }, [inputSearch, params]);

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
              BERITA TERBARU
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={1} sx={{ mb: 2 }}>
          <Grid item xs={8}>
            <TextField
              fullWidth
              label='Masukkan judul berita dan tekan "ENTER" untuk mencari'
              variant="outlined"
              value={inputSearch}
              size="small"
              onChange={(e) => {
                setInputSearch(e.target.value);
                if (e.target.value === "") {
                  debounceGetBerita("", params);
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
              onClick={() => debounceGetBerita(inputSearch, params)}
            >
              SEARCH
            </Button>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12}>
            {!listBerita ? (
              <Typography
                sx={{ mt: 10, fontWeight: 600, color: "red", mb: 20 }}
                align="center"
              >
                TIDAK ADA DATA BERITA!
              </Typography>
            ) : (
              <Box>
                {listBerita.map((item) => (
                  <Grid item xs={12} key={item.berita_id}>
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
                        src={item.berita_foto_url}
                        alt={item.berita_judul}
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
                            {item.berita_judul}
                          </Typography>
                          <Button
                            size="small"
                            sx={{
                              alignSelf: { xs: "flex-start", sm: "flex-end" },
                            }} // Align button
                            onClick={() => pindahKeDetail(item)}
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
                            sx={{ mt: 1, textAlign: "justify" }}
                          >
                            {truncateText(item.berita_desc, 20)}
                          </Typography>
                          <Typography
                            sx={{ mt: 1 }}
                            variant="body2"
                            color="text.secondary"
                          >
                            Date Updated: {formatDate(item.berita_date_update)}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}

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

export default Berita;
