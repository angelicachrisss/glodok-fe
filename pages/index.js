import Layout from "../components/Layout";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import { Box, debounce, ImageList, ImageListItem, Paper } from "@mui/material";
import SwipedPictures from "../components/SwipedPictures";
import api from "../services/api";
import { useCallback, useEffect, useState } from "react";
import useToast from "../utils/toast";

const Home = () => {
  const [displayToast] = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [tempData, setTempData] = useState("");
  const [videos, setVideos] = useState([]);
  const [valueSejarah, setValueSejarah] = useState(
    tempData === "" || tempData === null || tempData === undefined
      ? ""
      : tempData
  );

  const debounceSejarahBeranda = useCallback(
    debounce(getSejarahBeranda, 400),
    []
  );

  const debounceVideoBeranda = useCallback(debounce(getVideoBeranda, 400), []);

  async function getSejarahBeranda() {
    setIsLoading(true);
    try {
      const response = await api.getSejarahBeranda();
      const { data } = response.data;

      setTempData(data.sejarahberanda_isi);
    } catch (error) {
      // displayToast("error", error.message);
      displayToast("error", "Terjadi kesalahan! Silahkan Refresh Halaman");
    } finally {
      setIsLoading(false);
    }
  }

  async function getVideoBeranda() {
    try {
      const response = await api.getVideoBeranda();
      const { data } = response.data;
      console.log("data", data);

      const videoLinks = data.map((item) => item.videoberanda_link);
      setVideos(videoLinks);
    } catch (error) {
      // displayToast("error", error.message);
      displayToast("error", "Terjadi kesalahan! Silahkan Refresh Halaman");
    }
  }

  useEffect(() => {
    if (!isFetching) {
      debounceSejarahBeranda();
      debounceVideoBeranda();
      setIsFetching(true);
    }
  }, []);

  useEffect(() => {
    setValueSejarah(tempData);
  }, [tempData]);

  return (
    <Layout>
      <SwipedPictures />
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" align="center" sx={{ mb: 2, fontWeight: 600 }}>
          Apakah Kamu Tau Sejarah Glodok?
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper
              sx={{
                backgroundColor: "#D2D2CF",
                p: 2,
                borderRadius: "10px",
                boxShadow: 10,
              }}
            >
              <Typography
                sx={{
                  textAlign: "justify", // Rata kanan kiri
                  textIndent: "1em", // Indentasi di awal paragraf
                  mb: 2, // Margin bawah untuk jarak antar paragraf
                }}
              >
                {valueSejarah}
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {videos.length > 0 && (
          <>
            <Typography
              variant="h5"
              align="center"
              sx={{ mb: 2, mt: 3, fontWeight: 600 }}
            >
              Video Glodok Pancoran
            </Typography>

            <Grid container spacing={2} justifyContent="center">
              {videos.map((videoSrc, index) => (
                <Grid item xs={12} sm={4} key={index}>
                  <Paper
                    elevation={3}
                    sx={{
                      padding: 2,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <iframe
                      width="100%"
                      height="315"
                      src={videoSrc}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Box>
    </Layout>
  );
};

export default Home;
