import {
  Box,
  Button,
  Card,
  CardContent,
  debounce,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import Layout from "../../components/Layout";
import GlodokLogo from "../../public/static/logo/pesonaglodok.png";
import Image from "next/image";
import { useCallback, useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import api from "../../services/api";
import useToast from "../../utils/toast";
import { useRouter } from "next/router";

const Daftar = () => {
  const [displayToast] = useToast();
  const router = useRouter();
  const [value, setValue] = useState({
    user_id: "",
    user_name: "",
    user_pass: "",
    user_confirmapass: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const debounceInsertUser = useCallback(debounce(insertUser, 400), []);

  async function insertUser(value) {
    const capitalizedNama =
      value.user_name.charAt(0).toUpperCase() + value.user_name.slice(1);
    const payload = {
      user_id: value.user_id,
      user_name: capitalizedNama,
      user_pass: value.user_pass,
    };
    console.log("value: ", value);
    console.log("payload: ", payload);

    try {
      const response = await api.insertUser(payload);
      const { data } = response.data;

      if (data === "Berhasil") {
        displayToast("success", "Berhasil membuat akun!");
        router.push(`/login`);
      } else {
        displayToast(
          "error",
          "Username sudah dipakai! Silahkan menggunakan username yang lain"
        );
      }
    } catch (error) {
      console.log("error", error);
      console.log("errorresp", error.response.data.data);
      if (error.response.data.data === "Gagal") {
        displayToast(
          "error",
          "Username sudah dipakai! Silahkan menggunakan username yang lain"
        );
      }
    }
  }

  return (
    <Layout>
      <Box style={{ height: "100vh" }}>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          style={{ height: "100%" }}
        >
          <Card elevation={10} style={{ width: 400, borderRadius: " 12px" }}>
            <CardContent>
              <Box display="flex" justifyContent="center" mb={2}>
                <Image
                  src={GlodokLogo}
                  width={100}
                  height={100}
                  alt="Pesona Glodok Logo"
                />
              </Box>
              <Typography
                variant="h6"
                component="div"
                align="center"
                sx={{ fontWeight: 600 }}
              >
                Registrasi Akun
              </Typography>
              <TextField
                variant="outlined"
                fullWidth
                margin="normal"
                value={value.user_id}
                placeholder="Masukkan username anda"
                onChange={(e) =>
                  setValue({ ...value, user_id: e.target.value })
                }
              />
              <TextField
                placeholder="Masukkan nama anda"
                variant="outlined"
                fullWidth
                margin="normal"
                value={value.user_name}
                onChange={(e) =>
                  setValue({ ...value, user_name: e.target.value })
                }
              />
              <TextField
                placeholder="Masukkan password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                fullWidth
                margin="normal"
                value={value.user_pass}
                onChange={(e) =>
                  setValue({ ...value, user_pass: e.target.value })
                }
                InputProps={{
                  endAdornment: (
                    <Button
                      onClick={() => setShowPassword(!showPassword)}
                      sx={{ color: "#8D493A" }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </Button>
                  ),
                }}
              />
              <TextField
                placeholder="Masukkan konfirmasi password"
                type={showConfirmPassword ? "text" : "password"}
                variant="outlined"
                fullWidth
                margin="normal"
                value={value.user_confirmapass}
                onChange={(e) =>
                  setValue({ ...value, user_confirmapass: e.target.value })
                }
                InputProps={{
                  endAdornment: (
                    <Button
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      sx={{ color: "#8D493A" }}
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </Button>
                  ),
                }}
              />

              {value.user_confirmapass === "" ? (
                ""
              ) : value.user_confirmapass !== value.user_pass ? (
                <Typography
                  variant="body1"
                  sx={{ color: "red", mb: 2 }}
                  fontWeight={600}
                >
                  *Password tidak sama!
                </Typography>
              ) : (
                ""
              )}

              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2, mb: 3 }}
                disabled={
                  !value.user_id ||
                  !value.user_name ||
                  !value.user_pass ||
                  !value.user_confirmapass ||
                  value.user_confirmapass !== value.user_pass
                }
                onClick={() => debounceInsertUser(value)}
              >
                BUAT AKUN
              </Button>

              <Typography align="center" variant="body2">
                <Link href="/login" variant="body2" underline="hover">
                  {"<< "}
                  Kembali
                </Link>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Box>
    </Layout>
  );
};

export default Daftar;
