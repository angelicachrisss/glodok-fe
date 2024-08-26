import Layout from "../components/Layout";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import { Box, ImageList, ImageListItem, Paper } from "@mui/material";
import SwipedPictures from "../components/SwipedPictures";

const Home = () => {
  const videos = [
    "https://www.youtube.com/embed/EmcHiswvXrE?si=28C5QgkXkAlwq-3y",
    "https://www.youtube.com/embed/wIdJTnZVUq8?si=lM_MGat_pRWF6Od2",
    "https://www.youtube.com/embed/mjdsZup-bQA?si=1j1LQ8FVdQ0p8Lxq",
  ];
  return (
    <Layout>
      <SwipedPictures />
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" align="center" sx={{ mb: 2 }}>
          Apakah Kamu Tau Sejarah Glodok?
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper
              sx={{
                backgroundColor: "white",
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
                Kata Glodok berasal dari Bahasa Sunda golodog. Golodog berarti
                pintu masuk rumah, karena Sunda Kalapa (Jakarta) merupakan pintu
                masuk ke kerajaan Sunda. Karena sebelum dikuasai Belanda yang
                membawa para pekerja dari berbagai daerah dan menjadi Betawi
                atau Batavia, Sunda Kelapa dihuni oleh orang Sunda. Perubahan
                'G' jadi 'K' di belakang sering ditemukan pada kata-kata Sunda
                yg dieja oleh orang non-Sunda, yang kemudian banyak menghuni
                Jakarta. Sampai saat ini di Jakarta masih banyak ditemui nama
                daerah yang berasal dari Bahasa Sunda meski dengan ejaan yang
                telah sedikit berubah.
              </Typography>
              <Typography
                sx={{
                  textAlign: "justify", // Rata kanan kiri
                  textIndent: "1em", // Indentasi di awal paragraf
                  mb: 2, // Margin bawah untuk jarak antar paragraf
                }}
              >
                Nama Glodok juga berasal dari suara air pancuran dari sebuah
                gedung kecil persegi delapan di tengah-tengah halaman gedung
                Balai Kota (Stadhuis) – pusat pemerintahan Kumpeni Belanda di
                kota Batavia. Gedung persegi delapan ini, dibangun sekitar tahun
                1743 dan sempat dirubuhkan sebelum dibangun kembali tahun 1972,
                banyak membantu serdadu Kumpeni Belanda karena di situlah
                mengalir air bersih yang dapat digunakan untuk kebutuhan
                sehari-hari. Tak cuma bagi serdadu Kumpeni Belanda tetapi juga
                dimanfaatkan minum bagi kuda-kuda serdadu usai mengadakan
                perjalanan jauh. Bunyi air pancurannya grojok..grojok..grojok.
                Sehingga kemudian bunyi yang bersumber dari gedung kecil persegi
                delapan itu dieja penduduk pribumi sebagai Glodok.
              </Typography>
              <Typography
                sx={{
                  textAlign: "justify", // Rata kanan kiri
                  textIndent: "1em", // Indentasi di awal paragraf
                }}
              >
                Dari nama ”pancuran” akhirnya menjadi nama sebuah daerah yang
                kini dikenal sebagai Pancoran atau orang di kawasan Jakarta Kota
                menyebutnya dengan istilah ”Glodok Pancoran”. Hingga kini kedua
                nama yakni Glodok dan Glodok Pancoran masih akrab di telinga
                orang Jakarta, bahkan hingga ke luar Jakarta.
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        <Typography variant="h4" align="center" sx={{ mb: 2, mt: 3 }}>
          Video Sejarah Glodok
        </Typography>

        <Grid container spacing={2} justifyContent="center">
          {videos.map((videoSrc, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Paper
                elevation={3}
                sx={{ padding: 2, display: "flex", justifyContent: "center" }}
              >
                <iframe
                  width="100%"
                  height="315"
                  src={videoSrc}
                  // title={`YouTube video player ${index + 1}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Layout>
  );
};

export default Home;
