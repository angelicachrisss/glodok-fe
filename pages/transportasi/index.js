import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  debounce,
  Divider,
  Grid,
  Modal,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import Layout from "../../components/Layout";
import api from "../../services/api";
import useToast from "../../utils/toast";
import { useCallback, useEffect, useState } from "react";

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

const Transportasi = () => {
  const [displayToast] = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [totalData, setTotalData] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [listTransportasi, setListTransportasi] = useState([]);

  const debounceMountTransportasi = useCallback(
    debounce(mountGetTransportasi, 400),
    []
  );

  async function mountGetTransportasi(value) {
    setIsLoading(true);
    try {
      const response = await api.getTransportasi(value);
      const { data, metadata } = response.data;
      setListTransportasi(data);
      setTotalData(metadata.total_data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      displayToast(
        "error",
        "Gagal Mengambil Data Transportasi! Silahkan Refresh Halaman"
      );
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (!isFetching) {
      debounceMountTransportasi("");
      setIsFetching(true);
    }
  }, []);

  // Function to group transport by type
  const groupByTransportType = (list) => {
    return list.reduce((acc, curr) => {
      const type = curr.tipetransportasi_name;
      if (!acc[type]) {
        acc[type] = [];
      }
      acc[type].push(curr);
      return acc;
    }, {});
  };

  const groupedTransport = groupByTransportType(listTransportasi);

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
              TRANSPORTASI
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ mb: 2, borderWidth: 0.5, borderColor: "#B7B7B7" }} />

        <Grid container>
          <Grid item xs={12}>
            {!listTransportasi.length ? (
              <Typography
                sx={{ mt: 10, fontWeight: 600, color: "red", mb: 20 }}
                align="center"
              >
                TIDAK ADA DATA TRANSPORTASI!
              </Typography>
            ) : (
              <Box>
                {/* Iterate through each transport type */}
                {Object.keys(groupedTransport).map((transportType, idx) => (
                  <Box key={idx} sx={{ mb: 4 }}>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 600, mb: 2 }}
                      color="primary"
                      align="center"
                    >
                      {transportType.toUpperCase()}
                    </Typography>
                    <Grid container spacing={3} justifyContent="center">
                      {groupedTransport[transportType].map((data, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                          <Card
                            sx={{
                              display: "flex",
                              flexDirection: { xs: "column", sm: "row" },
                              borderRadius: 4,
                              boxShadow: 10,
                            }}
                          >
                            <CardContent>
                              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                {data.tipetransportasi_name.toUpperCase()}
                              </Typography>
                              <Typography
                                variant="body1"
                                sx={{ mb: 1.5 }}
                                color="text.secondary"
                              >
                                Rute:{" "}
                                {data.rute_no !== "" && data.rute_no !== "-"
                                  ? data.rute_no +
                                    " (" +
                                    data.tujuan_awal +
                                    " - " +
                                    data.tujuan_akhir +
                                    ")"
                                  : data.tujuan_awal +
                                    " - " +
                                    data.tujuan_akhir}
                              </Typography>
                              <Typography variant="body2">
                                Turun di: {data.pemberhentian_name}{" "}
                                {data.pemberhentian_perbaikanyn === "Y" ? (
                                  <Typography
                                    component="span"
                                    sx={{ color: "red" }}
                                  >
                                    (sedang dalam perbaikan)
                                  </Typography>
                                ) : (
                                  ""
                                )}
                              </Typography>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                ))}
              </Box>
            )}

            <Divider sx={{ mb: 2, borderWidth: 0.5, borderColor: "#B7B7B7" }} />

            <Grid container justifyContent="center" alignItems="center">
              <Grid item xs={12}>
                <Typography
                  variant="h5"
                  align="center"
                  sx={{ mb: 2, mt: 3, fontWeight: 600 }}
                >
                  PETA TERINTEGRASI
                </Typography>
              </Grid>

              <Grid item>
                <a
                  href="https://www.jakarta.go.id/informasi-trayek"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Button variant="contained">LIHAT PETA DISINI!</Button>
                </a>
              </Grid>
            </Grid>
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

export default Transportasi;
